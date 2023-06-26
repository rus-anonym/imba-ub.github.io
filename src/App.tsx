import {
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    Platform,
    ScreenSpinner,
    SplitLayout,
    WebviewType,
    platform
} from "@vkontakte/vkui";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import "moment/dist/locale/ru";
import Layout from "./Layout";

const App = () => {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [platform, setPlatform] = useState<Platform>(currentPlatform());

    useEffect(() => {
        function onResize(): void {
            setPlatform(currentPlatform);
        }

        window.addEventListener("resize", onResize, false);
        return () => window.removeEventListener("resize", onResize, false);
    }, []);


    return (
        <ConfigProvider 
            appearance="dark"
            transitionMotionEnabled={false}
            platform={platform}
            webviewType={WebviewType.INTERNAL}
        >
            <AdaptivityProvider>
                <AppRoot mode="full">
                    {isLoad ? (
                        <SplitLayout popout={<ScreenSpinner state="loading" />} />
                    ) : (
                        <Layout />
                    )}
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
};

function currentPlatform(): Platform {
    if (window.matchMedia("(orientation: landscape)").matches) {
        return Platform.VKCOM;
    }

    return platform() as Platform;
}

export default observer(App);
