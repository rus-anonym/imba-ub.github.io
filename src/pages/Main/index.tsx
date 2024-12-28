import session from "@/TS/session";
import utils from "@rus-anonym/web-utils";
import {
    Icon20HeadphonesSupportOutline,
    Icon28ArticleOutline,
    Icon28CheckShieldOutline,
    Icon28Newsfeed,
    Icon28SpeedometerMaxOutline,
    Icon28Users3Outline,
    Icon28WrenchOutline,
    Icon28ZeroRubleOutline
} from "@vkontakte/icons";
import {
    Alert,
    AlertActionInterface,
    Avatar,
    Button,
    Div,
    Group,
    Header,
    Headline,
    NavIdProps,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    Placeholder,
    SimpleCell,
    Spacing,
    useAdaptivityWithJSMediaQueries
} from "@vkontakte/vkui";
import { FC, useMemo } from "react";

import Imba from "@/TS/Imba";
import TelegramIcon from "../../../assets/Telegram.svg";
import ImbaIcon from "../../../assets/icon.png";

const MainPage: FC<NavIdProps> = ({ id }) => {
    const { isDesktop } = useAdaptivityWithJSMediaQueries();

    const chatActions = useMemo<AlertActionInterface[]>(() => {
        const actions: AlertActionInterface[] = [
            {
                mode: "default",
                title: "Продолжить",
                action: () => utils.web.redirect(Imba.links.chat)
            },
            {
                mode: "cancel",
                title: "Перейти к Telegram-боту",
                action: () => utils.web.redirect(Imba.links.tgBot)
            }
        ];

        if (isDesktop) {
            return actions;
        } else {
            return actions.reverse();
        }
    }, [isDesktop]);

    return (
        <Panel id={id}>
            <PanelHeader delimiter="none">
                <PanelHeaderContent
                    before={<img width={36} height={36} src={ImbaIcon} />}
                >
                    <div
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#52a374"
                        }}
                    >
                        Imba UserBot
                    </div>
                </PanelHeaderContent>
            </PanelHeader>
            <Group>
                <Div>
                    <Headline weight="2" useAccentWeight>
                        Imba UB - это бот для Вашей страницы ВКонтакте.
                    </Headline>
                    <Spacing />
                    <Headline weight="2" useAccentWeight>
                        С помощью него можно сохранять голосовые сообщения,
                        создавать цитаты, не выходя из диалога с другом, и
                        многое другое.
                    </Headline>
                </Div>
                <SimpleCell before={<Icon28ZeroRubleOutline />}>
                    Бесплатный
                </SimpleCell>
                <SimpleCell before={<Icon28SpeedometerMaxOutline />}>
                    Быстрый
                </SimpleCell>
                <SimpleCell before={<Icon28CheckShieldOutline />}>
                    Безопасный
                </SimpleCell>
                <Placeholder
                    icon={<Icon28WrenchOutline width={48} height={48} />}
                    noPadding
                    title="Инструкция по установке"
                    action={
                        <Button
                            size="l"
                            onClick={() => session.setPanel("/manual")}
                        >
                            Перейти к инструкции
                        </Button>
                    }
                />
            </Group>
            <Group header={<Header>Полезное</Header>}>
                <SimpleCell
                    chevron="always"
                    before={<Icon28Newsfeed />}
                    onClick={() => utils.web.redirect(Imba.links.news)}
                >
                    Новостной канал
                </SimpleCell>
                <SimpleCell
                    chevron="always"
                    before={
                        <Icon20HeadphonesSupportOutline
                            width={28}
                            height={28}
                        />
                    }
                    onClick={() => utils.web.redirect(Imba.links.support)}
                >
                    Беседа технической поддержки
                </SimpleCell>
                <SimpleCell
                    chevron="always"
                    before={<Icon28ArticleOutline />}
                    onClick={() => session.setPanel("/license")}
                >
                    Лицензионное соглашение
                </SimpleCell>
                <SimpleCell
                    chevron="always"
                    before={<Icon28Users3Outline />}
                    onClick={() => {
                        session.setPopout(
                            <Alert
                                onClose={() => session.setPopout(null)}
                                title="Необходимо подтверждение личности"
                                description="Для присутствия в чате пользователей, необходимо через бота привязать аккаунт к Telegram-боту"
                                actions={chatActions}
                            />
                        );
                    }}
                >
                    Беседа пользователей
                </SimpleCell>
                <SimpleCell
                    chevron="always"
                    before={<Avatar src={TelegramIcon} size={32} />}
                    onClick={() => utils.web.redirect(Imba.links.tgBot)}
                >
                    Бот в Telegram
                </SimpleCell>
            </Group>
        </Panel>
    );
};

export default MainPage;
