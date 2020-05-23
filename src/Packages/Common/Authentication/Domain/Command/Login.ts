import {AuthCommandTypes, LoginSettings} from "Packages/Common/Authentication/Domain/Types";
import {Command} from "Packages/Common/CommonTypes";

export function createLogin(settings: LoginSettings): Login {
    return {
        type: AuthCommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<AuthCommandTypes.LOGIN, LoginSettings>;

