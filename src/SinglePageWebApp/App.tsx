import React, { FC } from "react";
import { Provider as StoreProvider } from "react-redux";
import { Store } from "redux";
import { History } from "history";
import { ThemedApp } from "SinglePageWebApp/UI/ThemedApp";
import "bootstrap/scss/bootstrap.scss";
import { CSSPlugin } from "gsap/CSSPlugin";

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugins = [CSSPlugin]; // required to make sure CSSPlugin is not being dropped by webpack through tree shaking

export type RootComponentProps = {
  store: Store;
  history: History;
};

export const RootComponent: FC<RootComponentProps> = (props) => (
    <StoreProvider store={props.store}>
        <ThemedApp history={props.history} />
    </StoreProvider>
);
