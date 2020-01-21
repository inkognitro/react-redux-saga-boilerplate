import React, {FunctionComponent} from 'react';
import {Route, Switch} from "react-router";
import {homeRoute, loginRoute, passwordForgottenRoute} from "SinglePageApp/Routing/RouteFactory";
import {Home} from "SinglePageApp/Routing/Components/Home";
import {Login} from "SinglePageApp/Routing/Components/AuthPages/Login";
import {PwForgotten} from "SinglePageApp/Routing/Components/AuthPages/PwForgotten";
import {NotFoundError} from "SinglePageApp/Routing/Components/ErrorPages/Error404";
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