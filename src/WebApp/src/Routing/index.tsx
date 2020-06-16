import { RouterWC as CommonRouter, RouterWCSpecification } from "Packages/Common/Router/UI/RouterWC";
import React, { FC } from "react";
import { History } from "history";
import { homeRoute } from "WebApp/Routing/HomePage";
import {
    authPagesReducer,
    AuthPagesState, AuthPagesStateSelector,
    authRouteComponents,
    createAuthPagesSaga,
} from "WebApp/Routing/AuthPages";
import { spawn } from "@redux-saga/core/effects";
import { HomePageState } from "WebApp/Routing/HomePage/Domain/Types";
import { combineReducers, Reducer } from "redux";
import { homePageReducer } from "WebApp/Routing/HomePage/Domain/Reducer";
import { createHomePageSaga } from "WebApp/Routing/HomePage/Domain/Saga/Flow";
import { NotFoundWC } from "./NotFoundPage";
import { HomePageWC } from "./HomePage/UI/HomePageWC";

export * from './UrlFactory';

const specification: RouterWCSpecification = {
    routeComponents: [
        { route: homeRoute, component: HomePageWC },
        ...authRouteComponents,
    ],
    defaultComponent: NotFoundWC,
};

type RouterWCProps = { history: History };

export const RouterWC: FC<RouterWCProps> = (props) => <CommonRouter specification={specification} history={props.history} />;

export function createRoutingSaga(routingStateSelector: RoutingStateSelector): () => Generator {
    const authPagesStateSelector: AuthPagesStateSelector = (rootState: any) => routingStateSelector(rootState).authPages;
    return function* (): Generator {
        yield spawn(createHomePageSaga());
        yield spawn(createAuthPagesSaga(authPagesStateSelector));
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

export type RoutingStateSelector = (rootState: any) => RoutingState
