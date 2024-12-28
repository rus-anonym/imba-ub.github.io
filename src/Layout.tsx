import { FC, useMemo } from "react";

import AdaptivityLayout, {
    TAdaptivityButton
} from "@/components/adaptivity/layout";
import { observer } from "mobx-react";

import session from "./TS/session";

import { View } from "@vkontakte/vkui";

import LinkPage from "./pages/Link";
import MainPage from "./pages/Main";
import MainLicensePage from "./pages/Main/License";
import MainManualPage from "./pages/Main/Manual";
import StickersPage from "./pages/Stickers";

const Layout: FC = () => {
    const buttons = useMemo<TAdaptivityButton[]>(() => [], []);

    return (
        <AdaptivityLayout buttons={buttons} style={{ paddingTop: "1.25rem" }}>
            <View id="/" activePanel={session.activePanel}>
                <MainPage id="/" />
                <MainLicensePage id="/license" />
                <MainManualPage id="/manual" />
            </View>
            <View id="/stickers" activePanel={session.activePanel}>
                <StickersPage id="/" />
            </View>
            <View id="/link" activePanel={session.activePanel}>
                <LinkPage id="/" />
            </View>
        </AdaptivityLayout>
    );
};

export default observer(Layout);
