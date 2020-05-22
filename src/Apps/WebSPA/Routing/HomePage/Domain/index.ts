import {Route} from "Packages/Common/Router/Domain/Types";
import {spawn} from "@redux-saga/core/effects";
import {createHomePageSaga} from "Apps/WebSPA/Routing/HomePage/Domain/HomePage/HomePage";
import {authPagesReducer, AuthPagesState, createAuthPagesSaga} from "Apps/WebSPA/Routing/AuthPages";
import {combineReducers, Reducer} from "redux";
import {homePageReducer} from "Apps/WebSPA/Routing/HomePage/Domain/HomePage/Reducer";
import {HomePageState} from "Apps/WebSPA/Routing/HomePage/Domain/HomePage/Types";

export const homeRoute: Route = {
    urlSchema: "/",
    urlMustMatchExactly: true,
};
export const createHomeRouteUrl = (): string => homeRoute.urlSchema;

export const loginRoute: Route = {
    urlSchema: "/auth/login",
    urlMustMatchExactly: true,
};

export const createLoginRouteUrl = (): string => loginRoute.urlSchema;

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