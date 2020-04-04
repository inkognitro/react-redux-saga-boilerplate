import {CommandTypes} from "Common/AuthenticationWIP/Domain/Command/CommandHandler";
import {LoginSettings} from "Common/AuthenticationWIP/Domain/AuthManager";
import {Command} from "Common/Bootstrap/Domain/Command";

export function createLogin(settings: LoginSettings): Login {
    return {
        type: CommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<CommandTypes.LOGIN, LoginSettings>;