import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux'
import {Toaster} from "Common/Toaster/UI/Toaster";
import {Router} from 'SinglePageApp/Routing/UI/Router';
import 'SinglePageApp/App.scss';
import {Loader} from "SinglePageApp/Layout/UI/Loader";
import {ToastRepositoryInterface} from "Common/Toaster/Domain/ToastRepository";
import {HttpRequestManagerInterface} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";
import {AuthManagerInterface} from "Common/Auth/Domain/AuthManager";

export type Services = {
    store: Store
    authManager: AuthManagerInterface,
    toastRepository: ToastRepositoryInterface,
    httpRequestManager: HttpRequestManagerInterface,
};

export type RootComponentProps = {
    services: Services,
};

export class RootComponent extends Component<RootComponentProps> {
    componentDidMount() {
        //todo: initialize current user
        //todo: initialize refresh token interval!
    }

    render() {
        return (
            <Provider store={this.props.services.store}>
                <Router />
                <Toaster toastRepository={this.props.services.toastRepository} />
                <Loader httpRequestManager={this.props.services.httpRequestManager} />
            </Provider>
        );
    }
}