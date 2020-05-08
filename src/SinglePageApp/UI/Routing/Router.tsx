import { Specification, Router as CommonRouter } from "Common/UI/Router/Router";
import React, { FC } from "react";
import { History } from "history";
import { Home } from "./Home/Home";
import { NotFound } from "./NotFound";
import {homeRoute} from "SinglePageApp/Domain/Routing/Routes";

const specification: Specification = {
    routeComponents: [{ route: homeRoute, component: Home }],
    defaultComponent: NotFound,
};

type RouterProps = {
  history: History;
};

export const Router: FC<RouterProps> = (props) => <CommonRouter specification={specification} history={props.history} />;
