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

const MainPage: FC<NavIdProps> = ({ id }) => {
    const { isDesktop } = useAdaptivityWithJSMediaQueries();

    const chatActions = useMemo<AlertActionInterface[]>(() => {
        const actions: AlertActionInterface[] = [
            {
                mode: "default",
                title: "Продолжить",
                autoClose: true,
                action: () => utils.web.redirect("https://api.imbabot.ru/sl/chat")
            },
            {
                mode: "cancel",
                title: "Перейти к Telegram-боту",
                autoClose: true,
                action: () => utils.web.redirect("https://api.imbabot.ru/sl/telegram-bot")
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
            <PanelHeader separator={false}>
                <PanelHeaderContent
                    before={<img width={36} height={36} src="./assets/icon.png" />}
                >
                    <div
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#52a374",
                        }}
                    >
                    Imba UserBot
                    </div>
                </PanelHeaderContent>
                
            </PanelHeader>
            <Group>
                <Div>
                    <Headline weight="2">
                        Imba - это бот для Вашей страницы ВКонтакте.
                    </Headline>
                    <Spacing />
                    <Headline weight="2">
                        С помощью него можно сохранять голосовые сообщения,
                        создавать цитаты, не выходя из диалога с другом, и
                        многое другое.
                    </Headline>
                </Div>
                <SimpleCell before={<Icon28ZeroRubleOutline />} disabled>
                    Бесплатный
                </SimpleCell>
                <SimpleCell before={<Icon28SpeedometerMaxOutline />} disabled>
                    Быстрый
                </SimpleCell>
                <SimpleCell before={<Icon28CheckShieldOutline />} disabled>
                    Безопасный
                </SimpleCell>
                <Placeholder
                    icon={<Icon28WrenchOutline width={48} height={48}/>}
                    withPadding={false}
                    header="Инструкция по установке"
                    action={
                        <Button 
                            size="l" 
                            onClick={() => session.setPanel("/manual")}
                        >
                            Перейти к инструкции
                        </Button>
                    }/>
            </Group>
            <Group header={<Header mode="secondary">Полезное</Header>}>
                <SimpleCell
                    expandable
                    before={<Icon28Newsfeed />}
                    onClick={() => utils.web.redirect("https://api.imbabot.ru/sl/news")}
                >
                    Новостной канал
                </SimpleCell>
                <SimpleCell
                    expandable
                    before={
                        <Icon20HeadphonesSupportOutline
                            width={28}
                            height={28}
                        />
                    }
                    onClick={() => utils.web.redirect("https://api.imbabot.ru/sl/support")}
                >
                    Беседа технической поддержки
                </SimpleCell>
                <SimpleCell
                    expandable
                    before={<Icon28ArticleOutline />}
                    onClick={() => session.setPanel("/license")}
                >
                    Лицензионное соглашение
                </SimpleCell>
                <SimpleCell
                    expandable
                    before={<Icon28Users3Outline />}
                    onClick={() => {
                        session.setPopout(
                            <Alert 
                                onClose={() => session.setPopout(null)} 
                                header="Необходимо подтверждение личности"
                                text="Для присутствия в чате пользователей, необходимо через бота привязать аккаунт к Telegram-боту"
                                actions={chatActions}
                            />
                        );
                    }}
                >
                    Беседа пользователей
                </SimpleCell>
                <SimpleCell
                    expandable
                    before={
                        <Avatar
                            src="./assets/Telegram.svg"
                            size={32}
                        />
                    }
                    onClick={() => utils.web.redirect("https://api.imbabot.ru/sl/telegram-bot")}
                >
                    Бот в Telegram
                </SimpleCell>
            </Group>
        </Panel>
    );
};

export default MainPage;
