import {loginRoute} from "Apps/WebSPA/Routing/AuthPages/LoginPage";
import {homeRoute} from "Apps/WebSPA/Routing/HomePage";

export function createLoginRouteUrl(): string {
    return loginRoute.urlSchema;
}

export const createHomeRouteUrl = (): string => homeRoute.urlSchema;