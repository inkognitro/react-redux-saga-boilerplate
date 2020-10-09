import { Command } from "packages/common/types/util/domain";
import uuidV4 from "uuid/v4";
import { LoginSettings } from "./types";

export enum AuthCommandTypes {
    REFRESH_AUTHENTICATION = "REFRESH_AUTHENTICATION-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3",
    LOGIN = "LOGIN-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3",
    LOGOUT = "LOGOUT-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3",
}

export function createLogin(settings: LoginSettings): Login {
    return {
        type: AuthCommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<AuthCommandTypes.LOGIN, LoginSettings>;

export function createLogout(): Logout {
    return {
        type: AuthCommandTypes.LOGOUT,
        payload: {
            logoutId: uuidV4(),
        },
    };
}

export type Logout = Command<AuthCommandTypes.LOGOUT, {
    logoutId: string
}>;
