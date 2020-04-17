import React, {Component} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {Store} from 'redux';
import {Toaster} from "./UI/Base/Toaster";
import {History} from 'history';
import {Router} from "./UI/Routing/Router";
import {Loader} from "./UI/Base/Loader";
import {ThemeProvider} from 'styled-components';

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./App.scss');

export type RootComponentProps = {
    store: Store,
    history: History
};

export class RootComponent extends Component<RootComponentProps> {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <StoreProvider store={this.props.store}>
                    <Router history={this.props.history} />
                    <Toaster />
                    <Loader />
                </StoreProvider>
            </ThemeProvider>
        );
    }
}