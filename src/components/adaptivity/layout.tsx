import {
    Epic,
    PanelHeader,
    SplitCol,
    SplitLayout,
    SplitLayoutProps,
    useAdaptivityWithJSMediaQueries
} from "@vkontakte/vkui";
import { FC, JSX, useEffect, useState } from "react";

import AdaptivitySidebar from "./sidebar";
import { AdaptivityTabbar } from "./tabbar";

import session from "@/TS/session";
import { autorun, toJS } from "mobx";
import { observer } from "mobx-react";

export type TAdaptivityButton = {
    story: string;
    icon: JSX.Element;
    text: string;
};

type TAdaptivityLayoutProps = SplitLayoutProps & {
    buttons: TAdaptivityButton[];
    children: React.ReactElement | Iterable<React.ReactElement>;
};

const AdaptivityLayout: FC<TAdaptivityLayoutProps> = ({
    children,
    buttons,
    ...rest
}) => {
    const { isDesktop } = useAdaptivityWithJSMediaQueries();

    const [snackbar, setSnackbar] = useState<JSX.Element | null>(null);

    useEffect(() => {
        return autorun(() => {
            if (session.snackbar === null) {
                setSnackbar(null);
            } else {
                setSnackbar(toJS(session.snackbar));
            }
        });
    }, []);

    return (
        <SplitLayout
            center
            header={!isDesktop && <PanelHeader delimiter="none" />}
            {...rest}
        >
            {isDesktop && buttons.length > 0 && (
                <AdaptivitySidebar buttons={buttons} />
            )}

            <SplitCol
                autoSpaced
                animate={!isDesktop}
                width={isDesktop ? "650px" : "100%"}
                maxWidth={isDesktop ? "650px" : "100%"}
            >
                <Epic
                    activeStory={session.activeView}
                    tabbar={
                        !isDesktop &&
                        buttons.length > 0 && (
                            <AdaptivityTabbar buttons={buttons} />
                        )
                    }
                >
                    {children}
                </Epic>
                {snackbar}
            </SplitCol>
        </SplitLayout>
    );
};

export default observer(AdaptivityLayout);
