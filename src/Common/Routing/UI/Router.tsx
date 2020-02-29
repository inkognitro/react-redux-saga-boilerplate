import React from 'react';
import {Route, Switch, Router} from "react-router";
import {History} from 'history';
import {UrlSpecification} from "Common/Routing/Domain/CurrentRouteManager";

type RenderComponentDefinition<Services> = (services: Services) => JSX.Element;

export type RouteSpecification<Services> = {
    urlSpecification: UrlSpecification,
    renderComponent: RenderComponentDefinition<Services>,
};

export type RouterSpecification<Services> = {
    routeSpecifications: RouteSpecification<Services>[],
    renderDefaultComponent: RenderComponentDefinition<Services>
};

export function render<Services>(services: Services, routesSpecification: RouterSpecification<Services>, history: History) {
    const routes = routesSpecification.routeSpecifications.map((routeSpecification) => (
        <Route
            key={routeSpecification.urlSpecification.url}
            path={routeSpecification.urlSpecification.url}
            exact={routeSpecification.urlSpecification.shouldMatchExactly}
        >
            {routeSpecification.renderComponent(services)}
        </Route>
    ));
    return (
        <Router history={history}>
            <Switch>
                {routes}
                <Route key="5f857a7f-2452-4dd5-9cfb-f8c89c69260a" path="*">
                    {routesSpecification.renderDefaultComponent(services)}
                </Route>
            </Switch>
        </Router>
    );
}