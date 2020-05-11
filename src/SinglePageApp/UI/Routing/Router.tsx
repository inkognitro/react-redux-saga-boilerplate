import { Specification, Router as CommonRouter } from "Common/UI/Router/Router";
import React, { FC } from "react";
import { History } from "history";
import { homeRoute, loginRoute } from "SinglePageApp/Domain/Routing/Routes";
import { LoginPage } from "SinglePageApp/UI/Routing/AuthPages/LoginPage/LoginPage";
import { HomePage } from "./HomePage/HomePage";
import { NotFound } from "./NotFound";

const specification: Specification = {
    routeComponents: [
        { route: homeRoute, component: HomePage },
        { route: loginRoute, component: LoginPage },
    ],
    defaultComponent: NotFound,
};

type RouterProps = {
  history: History;
};

export const Router: FC<RouterProps> = (props) => <CommonRouter specification={specification} history={props.history} />;
