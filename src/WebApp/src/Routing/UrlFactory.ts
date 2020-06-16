import { loginRoute } from "WebApp/Routing/AuthPages/LoginPage";
import { homeRoute } from "WebApp/Routing/HomePage";

export function createLoginRouteUrl(): string {
    return loginRoute.urlSchema;
}

export const createHomeRouteUrl = (): string => homeRoute.urlSchema;
