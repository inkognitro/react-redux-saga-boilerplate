import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/Auth/Domain/Command/CommandHandler";

type AuthenticateSettings = {
    username: string,
    password: string,
    shouldRemember: boolean,
};

export function createLogin(settings: AuthenticateSettings): Login {
    return {
        type: CommandTypes.LOGIN,
        payload: settings,
    };
}

export type Login = Command<CommandTypes.LOGIN, AuthenticateSettings>;