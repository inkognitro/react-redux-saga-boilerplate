import React, { FC } from "react";
import { connect } from "react-redux";
import { Toaster } from "SinglePageWebApp/UI/Base/Toaster";
import { History } from "history";
import { Router } from "SinglePageWebApp/UI/Routing/Router";
import { Loader } from "SinglePageWebApp/UI/Base/Loader";
import { ThemeProvider } from "styled-components";
import { Theme } from "Packages/Common/Domain/Design/Types";
import { RootState } from "SinglePageWebApp/Bootstrap/ServicesFactory";
import { getTheme } from "Packages/Common/Domain/Design/Query/ThemeQuery";
import "bootstrap/scss/bootstrap.scss";

type DumbThemedAppProps = {
  theme: Theme;
  history: History;
};

const DumbThemedApp: FC<DumbThemedAppProps> = (props) => (
    <ThemeProvider theme={props.theme}>
        <Router history={props.history} />
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

export const ThemedApp = connect(mapStateToProps)(DumbThemedApp);
