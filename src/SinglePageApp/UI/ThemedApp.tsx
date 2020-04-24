import React, { FC } from "react";
import { connect } from "react-redux";
import { Toaster } from "SinglePageApp/UI/Base/Toaster";
import { History } from "history";
import { Router } from "SinglePageApp/UI/Routing/Router";
import { Loader } from "SinglePageApp/UI/Base/Loader";
import { ThemeProvider } from "styled-components";
import { Theme } from "Common/Domain/Design/Types";
import { RootState } from "SinglePageApp/Bootstrap/ServicesFactory";
import { getTheme } from "Common/Domain/Design/Query/ThemeQuery";
import "bootstrap/scss/bootstrap.scss";

type DumbThemedAppProps = {
  theme: Theme;
  history: History;
};

const DumbThemedApp: FC<DumbThemedAppProps> = (props) => {
  return (
    <ThemeProvider theme={props.theme}>
      <Router history={props.history} />
      <Toaster />
      <Loader />
    </ThemeProvider>
  );
};

const mapStateToProps = (
  rootState: RootState,
  props: { history: History }
): DumbThemedAppProps => {
  return {
    theme: getTheme(rootState.design),
    history: props.history,
  };
};

export const ThemedApp = connect(mapStateToProps)(DumbThemedApp);
