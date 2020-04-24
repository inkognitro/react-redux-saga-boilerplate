import { Command } from "Common/Domain/Bus/Command";
import { AuthCommandTypes } from "Common/Domain/Authentication/Types";

export function createLogout(): Logout {
  return {
    type: AuthCommandTypes.LOGOUT,
    payload: undefined,
  };
}

export type Logout = Command<AuthCommandTypes.LOGOUT>;
