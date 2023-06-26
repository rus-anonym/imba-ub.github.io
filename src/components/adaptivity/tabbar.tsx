import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { FC } from "react";

import session from "@/TS/session";
import { TAdaptivityButton } from "./layout";

type TAdaptivityTabbarProps = {
    buttons: TAdaptivityButton[];
};

export const AdaptivityTabbar: FC<TAdaptivityTabbarProps> = ({ buttons }) => {
    return (
        <Tabbar>
            {buttons.map(({ story, icon, text }: TAdaptivityButton) => (
                <TabbarItem
                    key={story}
                    selected={story === session.activeView}
                    text={text}
                    onClick={() => session.activeView !== story && session.setView(story)}
                >
                    {icon}
                </TabbarItem>
            ))}
        </Tabbar>
    );
};
