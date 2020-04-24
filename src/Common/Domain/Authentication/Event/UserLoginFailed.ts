import { AuthEventTypes } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";
import { LoginSettings } from "Common/Domain/Authentication/Command/Login";

export function createUserLoginFailed(
  loginSettings: LoginSettings
): UserLoginFailed {
  return {
    type: AuthEventTypes.USER_LOGIN_FAILED,
    payload: { loginSettings },
  };
}

export type UserLoginFailed = Event<
  AuthEventTypes.USER_LOGIN_FAILED,
  {
    loginSettings: LoginSettings;
  }
>;
