import utils from "@rus-anonym/web-utils";
import {
    Icon28LockOutline,
    Icon28More,
    Icon28StickerOutline,
    Icon28StickerSmileOutline,
    Icon28WalletOutline,
    Icon28ZeroRubleOutline
} from "@vkontakte/icons";
import {
    Avatar,
    Cell,
    Counter,
    Group,
    List,
    Placeholder,
    Title
} from "@vkontakte/vkui";
import { useMemo } from "react";
import { TUserStickersPacksInfo } from "./api";

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

export default UserStickersPacksInfo;
