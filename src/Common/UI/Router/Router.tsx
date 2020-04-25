import React, { ComponentType, FunctionComponent } from "react";
import {
    Route as ReactRoute,
    Router as ReactRouter,
    Switch,
} from "react-router-dom";
import { History } from "history";
import { Route as RouteData } from "Common/Domain/Router/Types";

export type RouteComponent = {
  route: RouteData;
  component: ComponentType;
};

export type Specification = {
  routeComponents: RouteComponent[];
  defaultComponent: ComponentType;
};

export type RouterProps = {
  history: History;
  specification: Specification;
};

export const Router: FunctionComponent<RouterProps> = (props) => (
    <ReactRouter history={props.history}>
        <Switch>
            {props.specification.routeComponents.map((routeComponent) => (
                <ReactRoute
                    key={routeComponent.route.urlSchema}
                    path={routeComponent.route.urlSchema}
                    exact={routeComponent.route.urlMustMatchExactly}
                    component={routeComponent.component}
                />
            ))}
            <ReactRoute
                key="5f857a7f-2452-4dd5-9cfb-f8c89c69260a"
                path="*"
                component={props.specification.defaultComponent}
            />
        </Switch>
    </ReactRouter>
);
