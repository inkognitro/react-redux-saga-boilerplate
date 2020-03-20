import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux'
import {Toaster} from "./Layout/UI/Toaster";
import {Home} from "./Routing/UI/Home";
import './App.scss';

export type RootComponentProps = {
    store: Store,
};

export class RootComponent extends Component<RootComponentProps> {
    render() { //todo: insert loader again!
        return (
            <Provider store={this.props.store}>
                <Home store={this.props.store}/>
                <Toaster />
            </Provider>
        );
    }
}