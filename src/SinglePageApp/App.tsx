import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux'
import {Toaster} from "Common/Toaster/UI/Toaster";
import {Router} from 'SinglePageApp/Routing/UI/Router';
import {Loader} from "SinglePageApp/Layout/UI/Loader";
import {ToastRepositoryInterface} from "Common/Toaster/Domain/ToastRepository";
import {HttpRequestManagerInterface} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";
import {AuthManagerInterface} from "Common/Auth/Domain/AuthManager";
import {ApiHttpRequestManager} from "Common/RequestHandling/Domain/ApiHttpRequestManager";
import 'SinglePageApp/App.scss';

export type AppServices = {
    store: Store
    authManager: AuthManagerInterface,
    toastRepository: ToastRepositoryInterface,
    httpRequestManager: HttpRequestManagerInterface,
    apiHttpRequestManager: ApiHttpRequestManager,
};

export type RootComponentProps = {
    services: AppServices,
};

export class RootComponent extends Component<RootComponentProps> {
    componentDidMount() {
        this.props.services.authManager.initializeCurrentUser();
    }

    render() {
        return (
            <Provider store={this.props.services.store}>
                <Router services={this.props.services} />
                <Toaster toastRepository={this.props.services.toastRepository} />
                <Loader httpRequestManager={this.props.services.httpRequestManager} />
            </Provider>
        );
    }
}