import { AuthCommandTypes } from "Packages/Common/Authentication/Domain/Types";
import uuidV4 from 'uuid/v4';
import {Command} from "Packages/Common/Types";

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
