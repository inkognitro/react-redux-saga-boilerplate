import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/Authentication/Domain/Command/CommandHandler";
import {LoginSettings} from "Common/Authentication/Domain/AuthManager";

export function createLogin(settings: LoginSettings): Login {
    return {
        type: CommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<CommandTypes.LOGIN, LoginSettings>;