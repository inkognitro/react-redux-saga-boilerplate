import { Specification, Router as CommonRouter } from "Common/UI/Router/Router";
import React, { FC } from "react";
import { History } from "history";
import { homeRoute } from "SinglePageApp/Domain/Routing/Home/Home";
import { Home } from "./Home/Home";
import { NotFound } from "./NotFound";

const specification: Specification = {
    routeComponents: [{ route: homeRoute, component: Home }],
    defaultComponent: NotFound,
};

type RouterProps = {
  history: History;
};

export const Router: FC<RouterProps> = (props) => <CommonRouter specification={specification} history={props.history} />;
