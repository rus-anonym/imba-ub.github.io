import utils from "@rus-anonym/web-utils";
import {
    Icon28StickerOutline,
    Icon28StickerSmileOutline
} from "@vkontakte/icons";
import {
    Accordion,
    Button,
    ButtonGroup,
    Footer,
    Group,
    Placeholder,
    RichCell,
    Search,
    Spacing,
    Spinner
} from "@vkontakte/vkui";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TUserStickersPacksInfo, getAssetsPath } from "./api";

const StickerCard = ({
    pack,
    accessKey,
    isDevServer
}: {
    pack: TUserStickersPacksInfo["stickers"][number];
    accessKey: string;
    isDevServer: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [thumbSrc, setThumbSrc] = useState<string | null>(null);

    useEffect(() => {
        if (pack.thumbs.length === 0) {
            return;
        }

        const findClosestNumber = (arr: number[], target: number): number => {
            let closestNum = arr[0];

            for (let i = 1; i < arr.length; ++i) {
                if (Math.abs(arr[i] - target) < Math.abs(closestNum - target)) {
                    closestNum = arr[i];
                }
            }

            return closestNum;
        };

        const thumbSrcPath = getAssetsPath({
            accessKey,
            packId: pack.id,
            type: {
                type: "thumb",
                size: findClosestNumber(pack.thumbs, 70).toString()
            },
            isDevServer
        });

        axios.get(thumbSrcPath, { responseType: "arraybuffer" }).then((res) => {
            if ("error" in res.data) {
                return;
            }

            const base64String = btoa(
                String.fromCharCode(...new Uint8Array(res.data))
            );

            setThumbSrc(`data:image/jpeg;charset=utf-8;base64,${base64String}`);
        });
    }, [pack.thumbs]);

    return (
        <Accordion
            //@ts-ignore
            open={isOpen}
            //@ts-ignore
            onToggle={(event) => {
                if (!("open" in event.target)) {
                    return;
                }

                setIsOpen(Boolean(event.target.open) && !isOpen);
            }}
        >
            <Accordion.Summary multiline>{pack.title}</Accordion.Summary>
            <RichCell
                before={
                    thumbSrc === null ? (
                        pack.isAnimated ? (
                            <Icon28StickerSmileOutline width={70} height={70} />
                        ) : (
                            <Icon28StickerOutline width={70} height={70} />
                        )
                    ) : (
                        <img src={thumbSrc} />
                    )
                }
                multiline
                disabled
                subtitle={`Автор: ${pack.author}`}
                actions={
                    <ButtonGroup mode="horizontal" gap="s" stretched>
                        <Button
                            mode="primary"
                            size="s"
                            onClick={() => utils.web.redirect(pack.url)}
                        >
                            Открыть в ВКонтакте
                        </Button>
                    </ButtonGroup>
                }
            >
                {pack.description}
            </RichCell>
        </Accordion>
    );
};

const FilteredStickers = ({
    stickers,
    accessKey,
    isDevServer
}: {
    accessKey: string;
    stickers: TUserStickersPacksInfo["stickers"];
    isDevServer: boolean;
}) => {
    const [search, setSearch] = useState("");

    const filteredStickers = useMemo(() => {
        const _search = search.toLowerCase();

        return stickers.filter(({ author, description, title }) => {
            if (author.toLowerCase().includes(_search)) {
                return true;
            }

            if (description.toLowerCase().includes(_search)) {
                return true;
            }

            if (title.toLowerCase().includes(_search)) {
                return true;
            }

            return false;
        });
    }, [search]);

    const [displayedStickers, setDisplayedStickers] = useState<
        TUserStickersPacksInfo["stickers"]
    >([]);

    const loadNextChunk = () => {
        setDisplayedStickers(
            filteredStickers.slice(0, displayedStickers.length + 10)
        );
    };

    useEffect(() => {
        setDisplayedStickers(filteredStickers.slice(0, 10));
    }, [filteredStickers]);

    return (
        <Group>
            <Search
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <InfiniteScroll
                dataLength={displayedStickers.length}
                next={loadNextChunk}
                hasMore={displayedStickers.length !== filteredStickers.length}
                loader={
                    <Placeholder noPadding>
                        <Spinner size="xl" />
                    </Placeholder>
                }
                scrollThreshold={0.5}
                endMessage={
                    <Footer>
                        {filteredStickers.length}{" "}
                        {utils.string.declOfNum(filteredStickers.length, [
                            "пак",
                            "пака",
                            "паков"
                        ])}
                    </Footer>
                }
            >
                {displayedStickers.map((sticker, index) => {
                    return (
                        <StickerCard
                            pack={sticker}
                            key={`sticker-${index}`}
                            accessKey={accessKey}
                            isDevServer={isDevServer}
                        />
                    );
                })}
                {displayedStickers.length !== filteredStickers.length && (
                    <>
                        <Spacing size={40} />
                        <Placeholder
                            noPadding
                            action={
                                <Button size="l" onClick={loadNextChunk}>
                                    Следующие
                                </Button>
                            }
                        />
                    </>
                )}
            </InfiniteScroll>
        </Group>
    );
};

export default FilteredStickers;
