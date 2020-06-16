import { loginRoute } from "Apps/WebApp/Routing/AuthPages/LoginPage";
import { homeRoute } from "Apps/WebApp/Routing/HomePage";

export function createLoginRouteUrl(): string {
    return loginRoute.urlSchema;
}

export const createHomeRouteUrl = (): string => homeRoute.urlSchema;
