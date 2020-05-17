import {Command} from "Packages/Common/Domain/Bus/Command";
import {AuthCommandTypes, LoginSettings} from "Packages/Common/Domain/Authentication/Types";

export function createLogin(settings: LoginSettings): Login {
    return {
        type: AuthCommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<AuthCommandTypes.LOGIN, LoginSettings>;

