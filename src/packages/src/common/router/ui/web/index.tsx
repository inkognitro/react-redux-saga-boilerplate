import React, { ComponentType, FC } from "react";
import { Route as ReactRoute, Router as ReactRouter, Switch } from "react-router-dom";
import { History } from "history";

export type Route = {
    path: string
    exact: boolean
    component: ComponentType
    isAuthenticationRequired: boolean
}

export type RouterProps = {
    history: History
    routes: Route[]
    defaultComponent: ComponentType
}

export const Router: FC<RouterProps> = (props) => (
    <ReactRouter history={props.history}>
        <Switch>
            {props.routes.map((route) => {
                return (
                    <ReactRoute
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                );
            })}
            <ReactRoute path="*" component={props.defaultComponent} />
        </Switch>
    </ReactRouter>
);
