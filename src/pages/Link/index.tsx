import session from "@/TS/session";
import utils from "@rus-anonym/web-utils";
import { Icon56CancelCircleOutline } from "@vkontakte/icons";
import {
    Group,
    NavIdProps,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    Placeholder,
    Progress
} from "@vkontakte/vkui";
import { FC, useEffect, useMemo, useState } from "react";
import ImbaIcon from "../../../assets/icon.png";

const redirectTime = 5000;
const step = 5;

const LinkPage: FC<NavIdProps> = ({ id }) => {
    const [remainRedirectTime, setRemainRedirectTime] =
        useState<number>(redirectTime);
    const [progressBarValue, setProgressBarValue] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (remainRedirectTime <= 0) {
                session.setView("/");
                session.setPanel("/");
            } else {
                setRemainRedirectTime(remainRedirectTime - step);
                setProgressBarValue(
                    ((redirectTime - remainRedirectTime) / redirectTime) * 100
                );
            }
        }, step);

        return () => clearInterval(interval);
    });

    const displayTime = useMemo(() => {
        const value = remainRedirectTime / 1000;

        if (value < 0.5) {
            return `сейчас`;
        }

        return `через ${value.toFixed(1)} ${utils.string.declOfNum(value, [
            "секунду",
            "секунды",
            "секунд"
        ])}...`;
    }, [remainRedirectTime]);

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
                <Placeholder
                    header={`Ссылка #${
                        (session.query.params as { id?: string })["id"]
                    } не обнаружена`}
                    icon={<Icon56CancelCircleOutline width={96} height={96} />}
                >
                    <Progress
                        height={20}
                        appearance="positive"
                        value={progressBarValue}
                    />
                    Перенаправление на главную страницу {displayTime}
                </Placeholder>
            </Group>
        </Panel>
    );
};

export default LinkPage;
