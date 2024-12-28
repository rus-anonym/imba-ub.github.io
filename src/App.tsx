import {
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    Platform,
    platform
} from "@vkontakte/vkui";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import "moment/dist/locale/ru";
import Layout from "./Layout";
import session from "./TS/session";

const App = () => {
    const [platform, setPlatform] = useState<
        (typeof Platform)[keyof typeof Platform]
    >(currentPlatform());

    useEffect(() => {
        function onResize(): void {
            setPlatform(currentPlatform);
        }

        window.addEventListener("resize", onResize, false);
        return () => window.removeEventListener("resize", onResize, false);
    }, []);

    return (
        <ConfigProvider
            colorScheme="dark"
            transitionMotionEnabled={false}
            platform={platform}
            hasCustomPanelHeaderAfter={false}
        >
            <AdaptivityProvider>
                <AppRoot mode="full">
                    <Layout />
                    {session.popout}
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
};

//@ts-ignore
function currentPlatform(): Platform {
    if (window.matchMedia("(orientation: landscape)").matches) {
        return Platform.VKCOM;
    }

    //@ts-ignore
    return platform() as Platform;
}

export default observer(App);
