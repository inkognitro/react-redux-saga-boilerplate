import { AuthEventTypes, LoginSettings } from "Packages/Common/Authentication/Domain/Types";
import {Event} from "Packages/Common/CommonTypes";

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
