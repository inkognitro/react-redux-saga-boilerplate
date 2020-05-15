import { Command } from "Common/Domain/Bus/Command";
import { AuthCommandTypes } from "Common/Domain/Authentication/Types";
import uuidV4 from 'uuid/v4';

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
