import React, {Component} from 'react';
import {Route, Router, Switch} from "react-router";
import {History} from 'history';
import {CurrentRouteManagerInterface, UrlSpecification} from "Common/Routing/Domain/CurrentRouteManager";

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

type RouteViewComponentProps<Props, RouteState> = (Props & {
    currentRouteManager: CurrentRouteManagerInterface,
    initialRouteState: RouteState,
});

export abstract class RouteViewComponent<Props, RouteState> extends Component<RouteViewComponentProps<Props, RouteState>> {
    protected constructor(props: RouteViewComponentProps<Props, RouteState>) {
        super(props);
        //@ts-ignore
        this.props.currentRouteManager.setCurrentRouteState(props.initialRouteState);
    }

    protected setRouteState(stateChanges: object): void {
        this.props.currentRouteManager.applyCurrentRouteStateChanges(stateChanges);
        this.forceUpdate();
    }

    protected getRouteState(): RouteState {
        //@ts-ignore
        return this.props.currentRouteManager.getCurrentRouteState();
    }

    componentWillUnmount(): void {
        this.props.currentRouteManager.setCurrentRouteState({});
    }
}