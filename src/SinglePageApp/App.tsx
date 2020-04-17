import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux'
import {Toaster} from "./UI/Base/Toaster";
import {History} from 'history';
import {Router} from "./UI/Routing/Router";
import {Loader} from "./UI/Base/Loader";

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