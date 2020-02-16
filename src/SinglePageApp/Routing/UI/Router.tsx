import React, {FunctionComponent} from 'react';
import {Route, Switch} from "react-router";
import {homeRoute, loginRoute, passwordForgottenRoute} from "SinglePageApp/Routing/Domain/RouteCreation";
import {Home} from "SinglePageApp/Routing/UI/Home";
import {Login} from "SinglePageApp/Routing/UI/AuthPages/Login";
import {PwForgotten} from "SinglePageApp/Routing/UI/AuthPages/PwForgotten";
import {NotFoundError} from "SinglePageApp/Routing/UI/ErrorPages/Error404";
import {BrowserRouter} from "react-router-dom";

export type RouterProps = {};
export const Router: FunctionComponent<RouterProps> = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={homeRoute.routerUrl} component={Home}/>
                <Route exact path={loginRoute.routerUrl} component={Login}/>
                <Route exact path={passwordForgottenRoute.routerUrl} component={PwForgotten}/>
                <Route path="*" component={NotFoundError}/>
            </Switch>
        </BrowserRouter>
    );
};