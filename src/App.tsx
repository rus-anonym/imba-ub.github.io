import {
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    Platform,
    ScreenSpinner,
    SplitLayout,
    platform
} from "@vkontakte/vkui";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import "moment/dist/locale/ru";
import Layout from "./Layout";

const App = () => {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    //@ts-ignore
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
            hasCustomPanelHeaderAfter={false}
        >
            <AdaptivityProvider>
                <AppRoot mode="full">
                    {isLoad ? (
                        <SplitLayout
                            popout={<ScreenSpinner state="loading" />}
                        />
                    ) : (
                        <Layout />
                    )}
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
