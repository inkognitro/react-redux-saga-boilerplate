import React from 'react';
import {
    render as renderCommonRouter, RouterSpecification,
    RouteComponent as CommonRouteSpecification
} from "Common/Routing/UI/Router";
import {NotFoundError} from "./NotFoundPage";
import {AppServices} from "../../App";
import {routeSpecification as homeRouteSpecification} from "./Home";
import {routeSpecification as loginRouteSpecification} from "./AuthPages/Login";
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