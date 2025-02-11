import session from "@/TS/session";
import {
    DisplayTitle,
    Div,
    Group,
    Headline,
    NavIdProps,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Spacing
} from "@vkontakte/vkui";
import { FC } from "react";

const Clauses = () => {
    return (<>
        <Headline weight="2" useAccentWeight>
            1. Мы обрабатываем (сообщения, диалоги и прочее) и храним
            (заметки, голосовые сообщение и прочее) Ваши личные данные для
            обеспечения работы бота. Это необходимо, поскольку бот работает
            на прямую на аккаунте пользователя.
        </Headline>
        <Spacing />
        <Headline weight="2" useAccentWeight>
            2. Мы имеем полное право в любой момент и без оснований закрыть
            Вам доступ к использованию бота. В частности, это будет
            происходить с вредителями, которые решат использовать бота для
            флуда командами, рассылки спама и тому подобного.
        </Headline>
        <Spacing />
        <Headline weight="2" useAccentWeight>
            3. Мы не несем ответственности за потенциально возможный вред,
            нанесенный Вашему аккаунту в связи с выдачей доступа к командам
            другим пользователям
        </Headline>
        <Spacing />
        <Headline weight="2" useAccentWeight>
            4. За любые блокировки аккаунта, полученные в связи с
            использованием бота, ответственны только Вы (в частности, этот
            пункт подразумевает возможные блокировки за команды с 18+
            контентом)
        </Headline>
        <Spacing />
        <Headline weight="2" useAccentWeight>
            5. Представление техподдержкой и администрацией проекта —
            запрещено
        </Headline>
        <Spacing />
        <Headline weight="2" useAccentWeight>
            6. Мы имеем право оповещать Вас о важных новостях путем рассылки
            в личные сообщения
        </Headline>
        <Spacing />
        <Headline weight="2" useAccentWeight>
            7. Перепродавать бота, вводить заблуждение касательно цены и пр.
            — запрещено.
        </Headline>
        <Spacing />
        <Headline weight="2" useAccentWeight>
            8. Деньги за купленную подписку вернуть нельзя.
        </Headline>
        <Spacing />
        <Headline weight="2" useAccentWeight>
            9. Для работы сайты требуется использование cookie файлов.
        </Headline>
        <Spacing />
        <Headline weight="2" useAccentWeight>
            10. Запрещено флудить/спамить, злоупотреблять антикапчой.
        </Headline>
    </>);
};

const MainLicensePage: FC<NavIdProps> = ({ id }) => {
    return (
        (<Panel id={id}>
            <PanelHeader
                delimiter="none"
                before={
                    <PanelHeaderBack onClick={() => session.setPanel("/")} />
                }
            >
                <DisplayTitle level="2">Лицензионное соглашение</DisplayTitle>
            </PanelHeader>
            <Group>
                <Div>
                    <Headline weight="2" useAccentWeight>
                        Данное пользовательское соглашение является обязательным
                        соглашением между Пользователем и Администрацией
                        страничного бота Imba, предметом которого является
                        предоставление Пользователю доступа к использованию
                        страничного бота Imba.
                    </Headline>
                    <Spacing />
                    <Headline weight="2" useAccentWeight>
                        Регистрируясь, Вы соглашаетесь с описанными ниже
                        условиями и обязуетесь выполнять их вплоть до удаления
                        своего профиля из базы данных бота.
                    </Headline>
                    <Placeholder>* * *</Placeholder>
                    <Headline weight="1" useAccentWeight>
                        Регистрируясь, вы согласны с тем, что:
                    </Headline>
                    <Clauses />
                </Div>
            </Group>
        </Panel>)
    );
};

export default MainLicensePage;
