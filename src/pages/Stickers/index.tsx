import Imba from "@/TS/Imba";
import session from "@/TS/session";
import LoadingPlaceholder from "@/components/adaptivity/LoadingPlaceholder";
import {
    NavIdProps,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelHeaderContent
} from "@vkontakte/vkui";
import axios from "axios";
import { FC, Suspense, lazy, useEffect, useMemo, useState } from "react";
import ImbaIcon from "../../../assets/icon.png";
import { TUserStickersPacksInfo } from "./api";

const FilteredStickers = lazy(() => import("./FilteredStickers"));
const UserStickersPacksInfo = lazy(() => import("./UserStickersPacksInfo"));

const StickersPage: FC<NavIdProps> = ({ id }) => {
    const [userStickersPacksInfo, setUserStickersPacksInfo] =
        useState<TUserStickersPacksInfo | null>(null);

    const [filteredStickersPanel, setFilteredStickersPanel] = useState<{
        header: string;
        stickers: TUserStickersPacksInfo["stickers"];
        accessKey: string;
    } | null>(null);

    const isDevServer = useMemo(() => {
        if (
            "server" in session.query.params &&
            session.query.params["server"] === "dev"
        ) {
            return true;
        }

        return false;
    }, []);

    useEffect(() => {
        if ("key" in session.query.params) {
            void (async function fetch() {
                const userStickersPacksInfo = await axios.post<{
                    response: {
                        value: TUserStickersPacksInfo;
                    };
                }>(
                    `${
                        isDevServer ? Imba.links.api.dev : Imba.links.api.prod
                    }/stickers.getPage`,
                    {
                        key: (session.query.params as { key: string }).key
                    }
                );

                if ("error" in userStickersPacksInfo.data) {
                    session.setView("/");
                    session.setPanel("/");
                    session.setAlert({
                        title: "Ошибка",
                        content: "Ссылка устарела, необходимо создать новую"
                    });
                    return;
                }

                setUserStickersPacksInfo(
                    userStickersPacksInfo.data.response.value
                );
            })().catch(() => {
                session.setView("/");
                session.setPanel("/");
                session.setAlert({
                    title: "Ошибка",
                    content: "Неизвестная ошибка"
                });
            });
        } else {
            session.setView("/");
            session.setPanel("/");
            session.setAlert({
                title: "Ошибка",
                content: "Некорректная ссылка"
            });
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
            <PanelHeader
                delimiter="none"
                onClick={() => {
                    if (filteredStickersPanel === null) {
                        session.setView("/");
                        session.setPanel("/");
                    }
                }}
            >
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
                <Suspense fallback={<LoadingPlaceholder />}>
                    <UserStickersPacksInfo
                        value={userStickersPacksInfo}
                        setStickers={setStickers}
                    />
                </Suspense>
            ) : (
                <Suspense fallback={<LoadingPlaceholder />}>
                    <FilteredStickers
                        stickers={filteredStickersPanel.stickers}
                        accessKey={filteredStickersPanel.accessKey}
                        isDevServer={isDevServer}
                    />
                </Suspense>
            )}
        </Panel>
    );
};

export default StickersPage;
