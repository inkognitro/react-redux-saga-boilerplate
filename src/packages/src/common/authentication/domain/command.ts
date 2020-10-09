import { Command } from "packages/common/types/util/domain";
import { LoginSettings } from "./types";

export enum AuthCommandTypes {
    LOGIN = "LOGIN-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3",
    REFRESH_AUTHENTICATION = "REFRESH_AUTHENTICATION-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3",
    LOGOUT = "LOGOUT-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3",
}

export type Login = Command<AuthCommandTypes.LOGIN, LoginSettings>
export function createLogin(settings: LoginSettings): Login {
    return {
        type: AuthCommandTypes.LOGIN,
        payload: settings,
    };
}

export type Logout = Command<AuthCommandTypes.LOGOUT>
export function createLogout(): Logout {
    return {
        type: AuthCommandTypes.LOGOUT,
        payload: undefined,
    };
}

export type RefreshAuthentication = Command<AuthCommandTypes.REFRESH_AUTHENTICATION>
export function createRefreshAuthentication(): RefreshAuthentication {
    return {
        type: AuthCommandTypes.REFRESH_AUTHENTICATION,
        payload: undefined,
    };
}
