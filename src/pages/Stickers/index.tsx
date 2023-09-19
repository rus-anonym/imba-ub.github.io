import session from "@/TS/session";
import LoadingPlaceholder from "@/components/adaptivity/LoadingPlaceholder";
import utils from "@rus-anonym/web-utils";
import { Static, Type } from "@sinclair/typebox";
import {
    Icon28LockOutline,
    Icon28More,
    Icon28StickerOutline,
    Icon28StickerSmileOutline,
    Icon28WalletOutline,
    Icon28ZeroRubleOutline
} from "@vkontakte/icons";
import {
    Accordion,
    Avatar,
    Button,
    ButtonGroup,
    Cell,
    Counter,
    Footer,
    Group,
    List,
    NavIdProps,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelHeaderContent,
    Placeholder,
    RichCell,
    Search,
    Spacing,
    Spinner,
    Title
} from "@vkontakte/vkui";
import axios from "axios";
import { FC, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImbaIcon from "../../../assets/icon.png";

const userStickersPacksInfoBox = Type.Object({
    user: Type.Object({
        id: Type.Number(),
        fullName: Type.String(),
        avatar: Type.String()
    }),
    stickers: Type.Array(
        Type.Object({
            id: Type.Number(),
            title: Type.String(),
            description: Type.String(),
            author: Type.String(),
            thumbs: Type.Array(Type.Number()),
            price: Type.Number(),
            url: Type.String(),
            demoPhotosCount: Type.Number(),
            styles: Type.Array(Type.Number()),
            previews: Type.Array(Type.Tuple([Type.Number(), Type.Number()])),
            hasBackground: Type.Boolean(),
            isAnimated: Type.Boolean(),
            isNotAvailable: Type.Boolean()
        })
    ),
    totalPrice: Type.Number(),
    accessKey: Type.String()
});
type TUserStickersPacksInfo = Static<typeof userStickersPacksInfoBox>;

const backgroundType = Type.Object({
    type: Type.Literal("background")
});
const thumbType = Type.Object({
    type: Type.Literal("thumb"),
    size: Type.String()
});
const previewType = Type.Object({
    type: Type.Literal("preview"),
    width: Type.String(),
    height: Type.String()
});
const demoPhotoType = Type.Object({
    type: Type.Literal("demo_photo"),
    index: Type.String()
});
const assetsTypes = Type.Union([
    backgroundType,
    thumbType,
    previewType,
    demoPhotoType
]);
type TAssetsType = Static<typeof assetsTypes>;
const getAssetsPath = ({
    accessKey,
    packId,
    type
}: {
    accessKey: string;
    packId: number;
    type: TAssetsType;
}): string => {
    const url = `https://dev-api.imbabot.ru/stickers/static/${packId}`;
    const params = new URLSearchParams({
        accessKey,
        ...type
    });
    return url + `?${params.toString()}`;
};

const StickerCard = ({
    pack,
    accessKey
}: {
    pack: TUserStickersPacksInfo["stickers"][number];
    accessKey: string;
}) => {
    // const thumbSrc = useMemo(() => {
    //     if (pack.thumbs[0] === undefined) {
    //         return "";
    //     }

    //     return getAssetsPath({
    //         accessKey,
    //         packId: pack.id,
    //         type: {
    //             type: "thumb",
    //             size: pack.thumbs[0].toString()
    //         }
    //     });
    // }, []);

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
            }
        });

        axios.get(thumbSrcPath, { responseType: "arraybuffer" }).then((res) => {
            const base64String = btoa(
                String.fromCharCode(...new Uint8Array(res.data))
            );

            setThumbSrc(`data:image/jpeg;charset=utf-8;base64,${base64String}`);
        });
    }, [pack.thumbs]);

    return (
        <Accordion
            open={isOpen}
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
                caption={`Автор: ${pack.author}`}
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
    accessKey
}: {
    accessKey: string;
    stickers: TUserStickersPacksInfo["stickers"];
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
                    <Placeholder withPadding={false}>
                        <Spinner size="large" />
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
                        />
                    );
                })}
                {displayedStickers.length !== filteredStickers.length && (
                    <>
                        <Spacing size={40} />
                        <Placeholder
                            withPadding={false}
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

const UserStickersPacksInfo = ({
    value,
    setStickers
}: {
    value: TUserStickersPacksInfo;
    setStickers: (
        header: string,
        stickers: TUserStickersPacksInfo["stickers"]
    ) => void;
}) => {
    const stickers = useMemo(() => {
        const list = value.stickers;
        const exclusiveStickers = list.filter((x) => x.isNotAvailable);
        const animatedStickers = list.filter((x) => x.isAnimated);
        const freeStickers = list.filter((x) => x.price === 0);
        return {
            counts: {
                exclusive: exclusiveStickers.length,
                animated: animatedStickers.length,
                free: freeStickers.length
            },
            list
        };
    }, [value.stickers]);

    return (
        <Group>
            <Group mode="plain">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center"
                    }}
                >
                    <Avatar size={96} src={value.user.avatar} />
                    <Title
                        style={{ marginBottom: 8, marginTop: 20, fontSize: 24 }}
                        level="3"
                        weight="2"
                    >
                        Стикеры {value.user.fullName}
                    </Title>
                </div>
            </Group>
            <Group mode="plain" separator="hide">
                <Placeholder
                    withPadding={false}
                    header={`${value.totalPrice} ${utils.string.declOfNum(
                        value.totalPrice,
                        ["голос", "голоса", "голосов"]
                    )}`}
                >
                    {utils.number.toString(value.totalPrice * 7, ",")}{" "}
                    {utils.string.declOfNum(value.totalPrice * 7, [
                        "рубль",
                        "рубля",
                        "рублей"
                    ])}
                </Placeholder>
            </Group>
            <Group mode="plain" separator="hide">
                <List>
                    <Cell
                        onClick={() => {
                            setStickers(
                                "Обычные стикеры",
                                stickers.list.filter((x) => !x.isAnimated)
                            );
                        }}
                        before={<Icon28StickerOutline />}
                        indicator={
                            <Counter mode="contrast">
                                {stickers.list.length -
                                    stickers.counts.animated}
                            </Counter>
                        }
                    >
                        Обычные стикеры
                    </Cell>
                    <Cell
                        onClick={() => {
                            setStickers(
                                "Анимированные стикеры",
                                stickers.list.filter((x) => x.isAnimated)
                            );
                        }}
                        before={<Icon28StickerSmileOutline />}
                        indicator={
                            <Counter mode="contrast">
                                {stickers.counts.animated}
                            </Counter>
                        }
                    >
                        Анимированные стикеры
                    </Cell>
                    <Cell
                        onClick={() => {
                            setStickers(
                                "Бесплатные стикеры",
                                stickers.list.filter((x) => x.price === 0)
                            );
                        }}
                        before={<Icon28ZeroRubleOutline />}
                        indicator={
                            <Counter mode="contrast">
                                {stickers.counts.free}
                            </Counter>
                        }
                    >
                        Бесплатные стикеры
                    </Cell>
                    <Cell
                        onClick={() => {
                            setStickers(
                                "Платные стикеры",
                                stickers.list.filter((x) => x.price !== 0)
                            );
                        }}
                        before={<Icon28WalletOutline />}
                        indicator={
                            <Counter mode="contrast">
                                {stickers.list.length - stickers.counts.free}
                            </Counter>
                        }
                    >
                        Платные стикеры
                    </Cell>
                    <Cell
                        onClick={() => {
                            setStickers(
                                "Эксклюзивные стикеры",
                                stickers.list.filter((x) => x.isNotAvailable)
                            );
                        }}
                        before={<Icon28LockOutline />}
                        indicator={
                            <Counter mode="contrast">
                                {stickers.counts.exclusive}
                            </Counter>
                        }
                    >
                        Эксклюзивные стикеры
                    </Cell>
                    <Cell
                        onClick={() => {
                            setStickers("Все стикеры", stickers.list);
                        }}
                        before={<Icon28More />}
                        indicator={
                            <Counter mode="contrast">
                                {stickers.list.length}
                            </Counter>
                        }
                    >
                        Все стикеры
                    </Cell>
                </List>
            </Group>
        </Group>
    );
};

const StickersPage: FC<NavIdProps> = ({ id }) => {
    const [userStickersPacksInfo, setUserStickersPacksInfo] =
        useState<TUserStickersPacksInfo | null>(null);

    const [filteredStickersPanel, setFilteredStickersPanel] = useState<{
        header: string;
        stickers: TUserStickersPacksInfo["stickers"];
        accessKey: string;
    } | null>(null);

    useEffect(() => {
        if ("key" in session.query.params) {
            void (async function fetch() {
                const userStickersPacksInfo = await axios.post<{
                    response: {
                        value: TUserStickersPacksInfo;
                    };
                }>("https://dev-api.imbabot.ru/stickers.getPage", {
                    key: (session.query.params as { key: string }).key
                });

                if ("error" in userStickersPacksInfo.data) {
                    // обработка для отсутсвующей страницы
                    session.setView("/");
                    session.setPanel("/");
                    return;
                }

                setUserStickersPacksInfo(
                    userStickersPacksInfo.data.response.value
                );
            })();
        } else {
            session.setView("/");
            session.setPanel("/");
        }
    }, [session.query.params]);

    const setStickers = (
        header: string,
        stickers: TUserStickersPacksInfo["stickers"]
    ): void => {
        setFilteredStickersPanel({
            header,
            stickers,
            accessKey: userStickersPacksInfo!.accessKey
        });
    };

    return (
        <Panel id={id}>
            <PanelHeader separator={false}>
                <PanelHeaderContent
                    before={
                        filteredStickersPanel === null ? (
                            <img width={36} height={36} src={ImbaIcon} />
                        ) : (
                            <PanelHeaderBack
                                onClick={() => {
                                    setFilteredStickersPanel(null);
                                }}
                            />
                        )
                    }
                >
                    <div
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color:
                                filteredStickersPanel === null
                                    ? "#52a374"
                                    : undefined
                        }}
                    >
                        {filteredStickersPanel === null
                            ? "Imba UserBot"
                            : filteredStickersPanel.header}
                    </div>
                </PanelHeaderContent>
            </PanelHeader>
            {userStickersPacksInfo === null ? (
                <LoadingPlaceholder />
            ) : filteredStickersPanel === null ? (
                <UserStickersPacksInfo
                    value={userStickersPacksInfo}
                    setStickers={setStickers}
                />
            ) : (
                <FilteredStickers
                    stickers={filteredStickersPanel.stickers}
                    accessKey={filteredStickersPanel.accessKey}
                />
            )}
        </Panel>
    );
};

export default StickersPage;
