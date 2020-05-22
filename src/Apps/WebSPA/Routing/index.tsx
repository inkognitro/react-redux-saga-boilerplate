import { RouterWC as CommonRouter, Specification } from "Packages/Common/Router/UI/RouterWC";
import React, { FC } from "react";
import { History } from "history";
import { homeRoute } from "Apps/WebSPA/Routing/HomePage";
import {
    authPagesReducer,
    AuthPagesState,
    authRouteComponents,
    createAuthPagesSaga,
} from "Apps/WebSPA/Routing/AuthPages";
import { spawn } from "@redux-saga/core/effects";
import { HomePageState } from "Apps/WebSPA/Routing/HomePage/Domain/Types";
import { combineReducers, Reducer } from "redux";
import { homePageReducer } from "Apps/WebSPA/Routing/HomePage/Domain/Reducer";
import { createHomePageSaga } from "Apps/WebSPA/Routing/HomePage/Domain/Saga/Flow";
import { NotFoundWC } from "./NotFoundPage";
import { HomePageWC } from "./HomePage/UI/HomePageWC";

export * from './UrlFactory';

const specification: Specification = {
    routeComponents: [
        { route: homeRoute, component: HomePageWC },
        ...authRouteComponents,
    ],
    defaultComponent: NotFoundWC,
};

type RouterWCProps = { history: History };

export const RouterWC: FC<RouterWCProps> = (props) => <CommonRouter specification={specification} history={props.history} />;

export function createRoutingSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(createHomePageSaga());
        yield spawn(createAuthPagesSaga());
    };
}

export const routingReducer: Reducer = combineReducers({
    homePage: homePageReducer,
    authPages: authPagesReducer,
});
export type RoutingState = {
    homePage: HomePageState
    authPages: AuthPagesState
};
