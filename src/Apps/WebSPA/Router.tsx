import { Specification, Router as CommonRouter } from "Packages/Common/Router/WebUI/Router";
import React, { FC } from "react";
import { History } from "history";
import { homeRoute } from "Apps/WebSPA/Routing/HomePage/Domain";
import { HomePage } from "./Routing/HomePage/UI/HomePage";
import { NotFound } from "./Routing/NotFoundPage/UI/NotFound";
import {authRouteComponents} from "Apps/WebSPA/Routing/AuthPages";

const specification: Specification = {
    routeComponents: [
        { route: homeRoute, component: HomePage },
        ...authRouteComponents,
    ],
    defaultComponent: NotFound,
};

type RouterProps = {
  history: History;
};

export const Router: FC<RouterProps> = (props) => <CommonRouter specification={specification} history={props.history} />;
