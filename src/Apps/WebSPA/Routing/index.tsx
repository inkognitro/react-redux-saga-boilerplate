import { Specification, RouterWC as CommonRouter } from "Packages/Common/Router/UI/RouterWC";
import React, { FC } from "react";
import { History } from "history";
import { homeRoute } from "Apps/WebSPA/Routing/HomePage/Domain";
import { authRouteComponents } from "Apps/WebSPA/Routing/AuthPages";
import { HomePage } from "./HomePage/UI/HomePage";
import { NotFound } from "./NotFoundPage/UI/NotFound";

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

export const Index: FC<RouterProps> = (props) => <CommonRouter specification={specification} history={props.history} />;
