import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux'
import {Toaster} from "SinglePageApp/Layout/UI/Toaster";
import {Loader} from "SinglePageApp/Layout/UI/Loader";
import {HttpRequestManagerInterface} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";
import {AuthManagerInterface} from "Common/Auth/Domain/AuthManager";
import {ApiHttpRequestManager} from "Common/RequestHandling/Domain/ApiHttpRequestManager";
import {Home} from "SinglePageApp/Routing/UI/Home";
import 'SinglePageApp/App.scss';

export type AppServices = {
    store: Store
    authManager: AuthManagerInterface,
    httpRequestManager: HttpRequestManagerInterface,
    apiHttpRequestManager: ApiHttpRequestManager,
};

export type RootComponentProps = {
    services: AppServices,
};

export class RootComponent extends Component<RootComponentProps> {
    componentDidMount() {
        //this.props.services.authManager.initializeCurrentUser();
    }

    render() {
        return (
            <Provider store={this.props.services.store}>
                <Home
                    store={this.props.services.store}
                    authManager={this.props.services.authManager}
                />
                <Toaster getToasterStateFromAppState={(state: object) => state.toaster} />
                <Loader httpRequestManager={this.props.services.httpRequestManager} />
            </Provider>
        );
    }
}