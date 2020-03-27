import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux'
import {Toaster} from "./Layout/UI/Toaster";
import {History} from 'history';
import {Router} from "SinglePageApp/Routing/Router";
import './App.scss';

export type RootComponentProps = {
    store: Store,
    history: History
};

export class RootComponent extends Component<RootComponentProps> {
    render() { //todo: insert loader again!
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history} />
                <Toaster />
            </Provider>
        );
    }
}