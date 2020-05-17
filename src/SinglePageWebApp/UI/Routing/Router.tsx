import { Specification, Router as CommonRouter } from "Packages/Common/UI/Web/Router/Router";
import React, { FC } from "react";
import { History } from "history";
import { homeRoute } from "SinglePageWebApp/Domain/Routing/Routes";
import { authRouteComponents } from "SinglePageWebApp/UI/Routing/AuthPages/AuthPages";
import { HomePage } from "./HomePage/HomePage";
import { NotFound } from "./NotFound";

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
