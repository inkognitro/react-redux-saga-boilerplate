import {Specification, Router as CommonRouter} from "Common/Routing/UI/Router";
import {NotFound} from "SinglePageApp/Routing/NotFound";
import {homeRouteComponent} from "SinglePageApp/Routing/Home/Home";
import React, {FunctionComponent} from "react";
import {History} from 'history';

const specification: Specification = {
    routeComponents: [
        homeRouteComponent,
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