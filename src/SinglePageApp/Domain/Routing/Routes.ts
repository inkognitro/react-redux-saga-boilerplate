import { Route } from "Common/Domain/Router/Types";

export const homeRoute: Route = {
    urlSchema: "/",
    urlMustMatchExactly: true,
};
export const createHomeRouteUrl = (): string => homeRoute.urlSchema;
