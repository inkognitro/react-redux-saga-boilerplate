import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux'
import {Toaster} from "./Layout/UI/Toaster";
import {History} from 'history';
import {Router} from "SinglePageApp/Routing/UI/Router";
import {Loader} from "SinglePageApp/Layout/UI/Loader";
import './App.scss';

export type RootComponentProps = {
    store: Store,
    history: History
};

export class RootComponent extends Component<RootComponentProps> {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history} />
                <Toaster />
                <Loader />
            </Provider>
        );
    }
}