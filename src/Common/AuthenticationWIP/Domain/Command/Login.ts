import {AuthCommandTypes} from "Common/AuthenticationWIP/Domain/Authentication";
import {Command} from "Common/Bootstrap/Domain/Command";

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