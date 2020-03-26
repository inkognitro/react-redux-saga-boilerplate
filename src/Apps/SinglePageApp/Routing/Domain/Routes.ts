import {Route} from "Common/Routing/Domain/Types";
import {Specification} from "Common/Routing/UI/Router";
import {NotFound} from "SinglePageApp/Routing/UI/NotFound";

export const homeRoute: Route = {
    urlSchema: '/',
    urlMustMatchExactly: true,
};

export const createHomeRouteUrl = (): string => {
    return homeRoute.urlSchema;
};

export const loginRoute: Route = {
    urlSchema: '/auth/login',
    urlMustMatchExactly: true,
};

export const createLoginRouteUrl = (): string => {
    return loginRoute.urlSchema;
};