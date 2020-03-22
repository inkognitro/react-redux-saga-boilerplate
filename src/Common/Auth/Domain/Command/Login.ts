import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/Auth/Domain/Command/CommandHandler";
import {LoginSettings} from "Common/Auth/Domain/AuthManager";

export function createLogin(settings: LoginSettings): Login {
    return {
        type: CommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<CommandTypes.LOGIN, LoginSettings>;