import { Command } from "Packages/Entity/CommonTypes";
import { AuthCommandTypes } from "./Types";

export function createInitializeCurrentUser(): InitializeCurrentUser {
    return {
        type: AuthCommandTypes.INITIALIZE_CURRENT_USER,
        payload: undefined,
    };
}

export type InitializeCurrentUser = Command<AuthCommandTypes.INITIALIZE_CURRENT_USER>;
