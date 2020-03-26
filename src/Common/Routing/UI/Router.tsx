import React, {Component, FunctionComponent} from 'react';
import {Route as ReactRoute, Router as ReactRouter, Switch} from "react-router";
import {History} from 'history';
import {Redirect, Route as RouteData} from "Common/Routing/Domain/Types";

export type RouteComponent = {
    route: RouteData,
    component: (Component | FunctionComponent),
};

export type RouterSpecification = {
    redirects: Redirect[],
    routeComponents: RouteComponent[],
    defaultComponent: (Component | FunctionComponent)
};

export type RepresentationalRouterProps = {
    history: History,
    routerSpecification: RouterSpecification
};

export const Router: FunctionComponent<RepresentationalRouterProps> = (props) => {
    return (
        <ReactRouter history={props.history}>
            <Switch>
                {props.routerSpecification.routeComponents.map((routeComponent) => (
                    <ReactRoute
                        key={routeComponent.route.urlSchema}
                        path={routeComponent.route.urlSchema}
                        exact={routeComponent.route.urlMustMatchExactly}
                    >
                        {routeComponent.component}
                    </ReactRoute>
                ))}
                <ReactRoute key="5f857a7f-2452-4dd5-9cfb-f8c89c69260a" path="*">
                    {props.routerSpecification.defaultComponent}
                </ReactRoute>
            </Switch>
        </ReactRouter>
    );
};
