import { AuthEventTypes, LoginSettings } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserLoginFailed(
    loginSettings: LoginSettings,
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
