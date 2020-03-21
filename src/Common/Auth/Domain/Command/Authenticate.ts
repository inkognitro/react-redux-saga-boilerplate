import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/Auth/Domain/Command/CommandHandler";

type AuthenticateSettings = {
    username: string,
    password: string,
    isLoaderEnabled: boolean,
};

export function createAuthenticate(settings: AuthenticateSettings): Authenticate {
    return {
        type: CommandTypes.AUTHENTICATE,
        payload: settings,
    };
}

export type Authenticate = Command<CommandTypes.AUTHENTICATE, AuthenticateSettings>;