import {CommandTypes} from "Common/AuthenticationWIP/Domain/Authentication";
import {Command} from "Common/Bootstrap/Domain/Command";

export function createLogin(settings: Payload): Login {
    return {
        type: CommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<CommandTypes.LOGIN, Payload>;

type Payload = {
    username: string,
    password: string,
    shouldRemember: boolean,
};