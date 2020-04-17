import React, {Component} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {Store} from 'redux';
import {Toaster} from "./UI/Base/Toaster";
import {History} from 'history';
import {Router} from "./UI/Routing/Router";
import {Loader} from "./UI/Base/Loader";
import {ThemeProvider} from 'styled-components';
import {baseTheme} from "Common/UI/Theme";
import 'SinglePageApp/UI/App.scss';

export type RootComponentProps = {
    store: Store,
    history: History
};

export class RootComponent extends Component<RootComponentProps> {
    render() {
        return (
            <ThemeProvider theme={baseTheme}>
                <StoreProvider store={this.props.store}>
                    <Router history={this.props.history} />
                    <Toaster />
                    <Loader />
                </StoreProvider>
            </ThemeProvider>
        );
    }
}