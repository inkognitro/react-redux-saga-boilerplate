import {Specification, Router as CommonRouter} from "Common/UI/Router/Router";
import {NotFound} from "./NotFound";
import React, {FunctionComponent} from "react";
import {History} from 'history';
import {Home} from "./Home/Home";
import {homeRoute} from "SinglePageApp/Domain/Routing/Home/Home";

const specification: Specification = {
    routeComponents: [
        {route: homeRoute, component: Home},
    ],
    defaultComponent: NotFound,
};

type RouterProps = {
    history: History,
}

export const Router: FunctionComponent<RouterProps> = (props) => {
    return (
        <CommonRouter
            specification={specification}
            history={props.history}
        />
    );
};