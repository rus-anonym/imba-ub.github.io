import session from "@/TS/session";
import utils from "@rus-anonym/web-utils";
import {
    Icon20HeadphonesSupportOutline,
    Icon28ArticleOutline,
    Icon28CheckShieldOutline,
    Icon28SpeedometerMaxOutline,
    Icon28WrenchOutline,
    Icon28ZeroRubleOutline
} from "@vkontakte/icons";
import {
    Div,
    Group,
    Header,
    Headline,
    NavIdProps,
    Panel,
    PanelHeader,
    SimpleCell,
    Spacing,
} from "@vkontakte/vkui";
import { FC } from "react";

const MainPage: FC<NavIdProps> = ({ id }) => {
    return (
        <Panel id={id}>
            <PanelHeader separator={false}>
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#52a374",
                    }}
                >
                    Imba UserBot
                </div>
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
            </Group>
            <Group header={<Header mode="secondary">Полезное</Header>}>
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
                    before={<Icon28WrenchOutline />}
                    onClick={() => session.setPanel("/manual")}
                >
                    Инструкция по установке
                </SimpleCell>
            </Group>
        </Panel>
    );
};

export default MainPage;
