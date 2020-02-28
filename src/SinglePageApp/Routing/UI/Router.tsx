import React, {FunctionComponent} from 'react';
import {Route, Switch} from "react-router";
import {homeRoute, loginRoute} from "SinglePageApp/Routing/Domain/RouteCreation";
import {Home} from "SinglePageApp/Routing/UI/Home";
import {Login} from "SinglePageApp/Routing/UI/AuthPages/Login";
import {NotFoundError} from "SinglePageApp/Routing/UI/ErrorPages/Error404";
import {BrowserRouter} from "react-router-dom";
import {AppServices} from "SinglePageApp/App";

export type RouterProps = {
    services: AppServices
};

export const Router: FunctionComponent<RouterProps> = (props: RouterProps) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={homeRoute.routerUrl}>
                    <Home
                        toastRepository={props.services.toastRepository}
                        getReduxState={() => props.services.store.getState()}
                        authManager={props.services.authManager}
                    />
                </Route>
                <Route exact path={loginRoute.routerUrl}>
                    <Login
                        authManager={props.services.authManager}
                    />
                </Route>
                <Route path="*">
                    <NotFoundError />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};