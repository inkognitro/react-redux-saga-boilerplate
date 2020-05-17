import { Route } from "Packages/Common/Domain/Router/Types";

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
