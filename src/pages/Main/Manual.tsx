import session from "@/TS/session";
import utils from "@rus-anonym/web-utils";
import { Icon20HeadphonesSupportOutline } from "@vkontakte/icons";
import {
    Div,
    FormItem,
    Group,
    Headline,
    Link,
    NavIdProps, Panel, PanelHeader, PanelHeaderBack, SegmentedControl, SimpleCell, Spacing
} from "@vkontakte/vkui";
import {
    FC, useEffect, useState
} from "react";

const MainManualPage: FC<NavIdProps> = ({ id }) => {
    const [referral, setReferral] = useState<null | string>(null);
    const [installSource, setInstallSource] = useState<"telegram" | "vk">("telegram");

    useEffect(() => {
        if ("ref" in session.query.params) {
            setReferral(session.query.params.ref as string);
        } 
    }, []);

    return (
        <Panel id={id}>
            <PanelHeader
                separator={false}
                before={
                    <PanelHeaderBack onClick={() => session.setPanel("/")} />
                }
            >
                Инструкция по установке
            </PanelHeader>
            <Group>
                <Div>
                    <FormItem top="Метод установки">
                        <SegmentedControl
                            size="m"
                            name="install-source"
                            value={installSource}
                            onChange={(value) => setInstallSource(value as "telegram" | "vk")}
                            options={[
                                {
                                    label: "Telegram",
                                    value: "telegram",
                                },
                                {
                                    label: "ВКонтакте",
                                    value: "vk",
                                }
                            ]}
                        />
                    </FormItem>
                    <Headline weight="2">
                    1. Сначала необходимо получить токен, для этого необходимо
                    перейти по{" "}
                        <Link target="_blank" href="https://api.imbabot.ru/ut">
                        ссылке для получения токена
                        </Link>
                    .
                    </Headline>
                    <Spacing />
                    {installSource === "vk" && (
                        <Headline weight="2">
                    2. После необходимо отправить токен в{" "}
                            <Link
                                target="_blank"
                                href="https://vk.com/mine_company_bot"
                            >
                        группу приёмник токенов
                            </Link>
                    .
                        </Headline>
                    )}
                    {installSource === "telegram" && (
                        <Headline weight="2">
                    2. После необходимо отправить токен в {" "}
                            <Link
                                target="_blank"
                                href="https://api.imbabot.ru/sl/telegram-bot"
                            >
                                бота
                            </Link>, командой /add {"<token>"}
                            
                        </Headline>
                    )}
                    <Spacing />
                    <Headline weight="2">
                    3. После отправки токена, должно произойти автоматическое
                    создание группы управления, через которое в дальнейшем и
                    будет происходить управление ботом и установить токен группы
                    </Headline>
                    {referral !== null && (
                        <>
                            <Spacing />
                            <Headline weight="2">
                    4. Теперь необходимо ввести команду «/ref {referral}»
                                <br />
                    Это необходимо для того, чтобы пользователь пригласивший Вас получил вознаграждение
                            </Headline>
                        </>
                    )}
                    <Spacing />
                    <Headline weight="2">
                        По всем возникшим вопросам можно связаться с технической поддержкой
                    </Headline>
                </Div>
                <Spacing />
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
            </Group>
        </Panel>
    );
};

export default MainManualPage;
