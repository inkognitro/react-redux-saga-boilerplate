import React, { FC } from "react";
import { connect, Provider as StoreProvider } from "react-redux";
import { Store } from "redux";
import { History } from "history";
import { CSSPlugin } from "gsap/CSSPlugin";
import { Theme } from "Packages/Common/Design/Domain/Types";
import { ThemeProvider } from "styled-components";
import { RouterWC } from "Apps/WebSPA/Routing";
import { Toaster } from "Apps/WebSPA/LayoutFoundation/UI/Toaster";
import { Loader } from "Apps/WebSPA/LayoutFoundation/UI/Loader";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { getTheme } from "Packages/Common/Design/Domain/Query/ThemeQuery";
import "bootstrap/scss/bootstrap.scss";

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugins = [CSSPlugin]; // required to make sure CSSPlugin is not being dropped by webpack through tree shaking

type DumbThemedAppProps = {
    theme: Theme;
    history: History;
};

const DumbThemedApp: FC<DumbThemedAppProps> = (props) => (
    <ThemeProvider theme={props.theme}>
        <RouterWC history={props.history} />
        <Toaster />
        <Loader />
    </ThemeProvider>
);

const mapStateToProps = (
    rootState: RootState,
    props: { history: History },
): DumbThemedAppProps => ({
    theme: getTheme(rootState.design),
    history: props.history,
});

const ThemedApp = connect(mapStateToProps)(DumbThemedApp);

export type RootComponentProps = {
    store: Store;
    history: History;
};

export const RootComponent: FC<RootComponentProps> = (props) => (
    <StoreProvider store={props.store}>
        <ThemedApp history={props.history} />
    </StoreProvider>
);
