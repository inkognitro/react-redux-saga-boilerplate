import { loginRoute } from "../sub-modules/auth-pages/domain";
import { homeRoute } from "../sub-modules/home-page/domain";

export function createLoginRouteUrl(): string {
    return loginRoute.urlSchema;
}

export const createHomeRouteUrl = (): string => homeRoute.urlSchema;
