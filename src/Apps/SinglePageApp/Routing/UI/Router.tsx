import {Specification, Router as CommonRouter} from "Common/Router/UI/Router";
import {NotFound} from "SinglePageApp/Routing/UI/NotFound";
import React, {FunctionComponent} from "react";
import {History} from 'history';
import {homeRouteComponent} from "SinglePageApp/Routing/UI/Home/Home";

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