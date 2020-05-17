import { Specification, Router as CommonRouter } from "Packages/Common/UI/Web/Router/Router";
import React, { FC } from "react";
import { History } from "history";
import { homeRoute, loginRoute } from "SinglePageWebApp/Domain/Routing/Routes";
import { LoginPage } from "SinglePageWebApp/UI/Routing/AuthPages/LoginPage/LoginPage";
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
