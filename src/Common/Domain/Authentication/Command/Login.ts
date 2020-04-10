import {AuthCommandTypes} from "Common/Domain/Authentication/Authentication";
import {Command} from "Common/Domain/Bus/Command";

export function createLogin(settings: LoginSettings): Login {
    return {
        type: AuthCommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<AuthCommandTypes.LOGIN, LoginSettings>;

export type LoginSettings = {
    username: string,
    password: string,
    shouldRemember: boolean,
};