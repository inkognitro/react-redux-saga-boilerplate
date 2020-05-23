import { AuthCommandTypes } from "Packages/Common/Authentication/Domain/Types";
import {Command} from "Packages/Common/CommonTypes";

export function createInitializeCurrentUser(): InitializeCurrentUser {
    return {
        type: AuthCommandTypes.INITIALIZE_CURRENT_USER,
        payload: undefined,
    };
}

export type InitializeCurrentUser = Command<
  AuthCommandTypes.INITIALIZE_CURRENT_USER
>;
