import {
    Cell, Group, List, PanelHeader,
    SplitCol
} from "@vkontakte/vkui";
import { observer } from "mobx-react";
import { FC } from "react";

import session from "@/TS/session";
import { TAdaptivityButton } from "./layout";

type TAdaptivitySidebarProps = {
    buttons: TAdaptivityButton[];
};

const AdaptivitySidebar: FC<TAdaptivitySidebarProps> = ({ buttons }) => {
    return (
        <SplitCol fixed width="280px" maxWidth="280px">
            <PanelHeader separator>
                { /* // Logo?? */ }
            </PanelHeader>
            <Group>
                <List>
                    {buttons.map(({ story, icon, text }: TAdaptivityButton) => (
                        <Cell
                            key={story}
                            before={icon}
                            style={
                                session.activeView === story
                                    ? {
                                        backgroundColor:
                        "var(--vkui--color_background_secondary)",
                                        borderRadius: 8
                                    }
                                    : {
                                    }
                            }
                            onClick={() => session.activeView !== story && session.setView(story)}
                        >
                            {text}
                        </Cell>
                    ))}
                </List>
            </Group>
        </SplitCol>
    );
};

export default observer(AdaptivitySidebar);
