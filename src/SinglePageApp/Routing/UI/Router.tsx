import React from 'react';
import {
    render as renderCommonRouter, RouterSpecification,
    RouteSpecification as CommonRouteSpecification
} from "Common/Routing/UI/Router";
import {NotFoundError} from "SinglePageApp/Routing/UI/NotFoundPage";
import {AppServices} from "SinglePageApp/App";
import {routeSpecification as homeRouteSpecification} from "SinglePageApp/Routing/UI/Home";
import {routeSpecification as loginRouteSpecification} from "SinglePageApp/Routing/UI/AuthPages/Login";
import {History} from 'history';

export type RouteSpecification = CommonRouteSpecification<AppServices>;

const routesSpecification: RouterSpecification<AppServices> = {
    routeSpecifications: [
        homeRouteSpecification,
        loginRouteSpecification,
    ],
    renderDefaultComponent: (services: AppServices) => (
        <NotFoundError currentRouteManager={services.currentRouteManager} />
    )
};

export function render(services: AppServices, history: History) {
    return renderCommonRouter(services, routesSpecification, history);
}