import { AuthEventTypes } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";
import { LoginSettings } from "Common/Domain/Authentication/Command/Login";

export function createUserLoginWasCancelled(
  loginSettings: LoginSettings
): UserLoginWasCancelled {
  return {
    type: AuthEventTypes.USER_LOGIN_WAS_CANCELLED,
    payload: { loginSettings },
  };
}

export type UserLoginWasCancelled = Event<
  AuthEventTypes.USER_LOGIN_WAS_CANCELLED,
  {
    loginSettings: LoginSettings;
  }
>;
