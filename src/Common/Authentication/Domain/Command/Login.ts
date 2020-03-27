import {CommandTypes} from "Common/Authentication/Domain/Command/CommandHandler";
import {LoginSettings} from "Common/Authentication/Domain/AuthManager";
import {Command} from "Common/Bootstrap/Command";

export function createLogin(settings: LoginSettings): Login {
    return {
        type: CommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<CommandTypes.LOGIN, LoginSettings>;