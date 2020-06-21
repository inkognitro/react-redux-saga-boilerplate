import { loginRoute } from "../SubModules/AuthPages/Domain";
import { homeRoute } from "../SubModules/HomePage/Domain";

export function createLoginRouteUrl(): string {
    return loginRoute.urlSchema;
}

export const createHomeRouteUrl = (): string => homeRoute.urlSchema;
