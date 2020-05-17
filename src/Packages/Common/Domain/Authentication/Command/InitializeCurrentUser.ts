import { Command } from "Packages/Common/Domain/Bus/Command";
import { AuthCommandTypes } from "Packages/Common/Domain/Authentication/Types";

export function createInitializeCurrentUser(): InitializeCurrentUser {
    return {
        type: AuthCommandTypes.INITIALIZE_CURRENT_USER,
        payload: undefined,
    };
}

export type InitializeCurrentUser = Command<
  AuthCommandTypes.INITIALIZE_CURRENT_USER
>;
