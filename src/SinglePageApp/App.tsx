import React, { FC } from "react";
import { Provider as StoreProvider } from "react-redux";
import { Store } from "redux";
import { History } from "history";
import { ThemedApp } from "SinglePageApp/UI/ThemedApp";
import "bootstrap/scss/bootstrap.scss";
import { CSSPlugin } from "gsap/CSSPlugin";

// @ts-ignore
const plugins = [CSSPlugin]; // without this line, CSSPlugin is being dropped by webpack through tree shaking and multiple animations with gsap do not work properly

export type RootComponentProps = {
  store: Store;
  history: History;
};

export const RootComponent: FC<RootComponentProps> = (props) => {
  return (
    <StoreProvider store={props.store}>
      <ThemedApp history={props.history} />
    </StoreProvider>
  );
};
