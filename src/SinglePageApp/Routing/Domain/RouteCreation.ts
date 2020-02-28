import {Home} from "SinglePageApp/Routing/UI/Home";
import {Login} from "SinglePageApp/Routing/UI/AuthPages/Login";

type Route = {
    routerUrl: string,
    initialState: object,
};

export const homeRoute: Route = {
    routerUrl: '/',
    initialState: Home.createInitialState(),
};
export const createHomeRouteUrl = (): string => {
    return homeRoute.routerUrl;
};

export const loginRoute: Route = {
    routerUrl: '/auth/login',
    initialState: Login.createInitialState(),
};
export const createLoginRouteUrl = (): string => {
    return loginRoute.routerUrl;
};

export const passwordForgottenRoute: Route = {
    routerUrl: '/auth/pwforgotten',
    initialState: {}
};
export const createPasswordForgottenUrl = (): string => {
    return passwordForgottenRoute.routerUrl;
};