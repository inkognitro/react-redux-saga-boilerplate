import uuidV4 from 'uuid/v4';
import { Command } from "packages/entity/common-types";
import { AuthCommandTypes } from "./Types";

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
