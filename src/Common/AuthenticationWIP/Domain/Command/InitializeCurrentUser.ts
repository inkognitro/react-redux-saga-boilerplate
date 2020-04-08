import {AuthCommandTypes} from "Common/AuthenticationWIP/Domain/Authentication";
import {Command} from "Common/Bus/Domain/Command";

export function createInitializeCurrentUser(): InitializeCurrentUser {
    return {
        type: AuthCommandTypes.INITIALIZE_CURRENT_USER,
        payload: undefined,
    };
}

export type InitializeCurrentUser = Command<AuthCommandTypes.INITIALIZE_CURRENT_USER>;