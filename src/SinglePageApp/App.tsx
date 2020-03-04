import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux'
import {Toaster} from "Common/Toaster/UI/Toaster";
import {render as renderRouter} from 'SinglePageApp/Routing/UI/Router';
import {Loader} from "SinglePageApp/Layout/UI/Loader";
import {HttpRequestManagerInterface} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";
import {AuthManagerInterface} from "Common/Auth/Domain/AuthManager";
import {ApiHttpRequestManager} from "Common/RequestHandling/Domain/ApiHttpRequestManager";
import {CurrentRouteManagerInterface} from "Common/Routing/Domain/CurrentRouteManager";
import 'SinglePageApp/App.scss';

export type AppServices = {
    store: Store
    authManager: AuthManagerInterface,
    httpRequestManager: HttpRequestManagerInterface,
    apiHttpRequestManager: ApiHttpRequestManager,
    currentRouteManager: CurrentRouteManagerInterface,
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
                {renderRouter(this.props.services, this.props.services.currentRouteManager.getHistory())}
                <Toaster getToasterStateFromRootState={(state: object) => state.toaster} />
                <Loader httpRequestManager={this.props.services.httpRequestManager} />
            </Provider>
        );
    }
}