import React, { ComponentType, FC } from 'react';
import { Route as ReactRoute, Router as ReactRouter, Switch } from 'react-router-dom';
import { History } from 'history';
import { AuthUser, AuthUserTypes } from 'packages/common/types/auth-user/domain';

// todo: implement redirects as well: e.g. redirect from login page to home if user is already logged in.

export type Route = {
    path: string;
    exact: boolean;
    component: ComponentType;
    isAuthenticationRequired?: boolean;
};

type GetProtectedRouteComponentSettings = {
    route: Route;
    currentUser: AuthUser;
    notAuthorizedComponent: ComponentType;
};

function getProtectedRouteComponent(settings: GetProtectedRouteComponentSettings): ComponentType {
    if (!settings.route.isAuthenticationRequired) {
        return settings.route.component;
    }
    if (settings.route.isAuthenticationRequired && settings.currentUser.type === AuthUserTypes.AUTHENTICATED_USER) {
        return settings.route.component;
    }
    return settings.notAuthorizedComponent;
}

export type RouterProps = {
    currentUser: AuthUser;
    history: History;
    routes: Route[];
    notAuthorizedComponent: ComponentType;
    notFoundComponent: ComponentType;
};

export const Router: FC<RouterProps> = (props) => (
    <ReactRouter history={props.history}>
        <Switch>
            {props.routes.map((route) => {
                const component = getProtectedRouteComponent({
                    route,
                    currentUser: props.currentUser,
                    notAuthorizedComponent: props.notAuthorizedComponent,
                });
                return <ReactRoute key={route.path} path={route.path} exact={route.exact} component={component} />;
            })}
            <ReactRoute path="*" component={props.notFoundComponent} />
        </Switch>
    </ReactRouter>
);
