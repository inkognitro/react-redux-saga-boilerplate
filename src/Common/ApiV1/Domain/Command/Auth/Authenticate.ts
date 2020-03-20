import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/ApiV1/Domain/CommandHandler";

export function createAuthenticate(settings: AuthenticateSettings): Authenticate {
    return {
        type: CommandTypes.AUTHENTICATE,
        payload: settings,
    };
}

export type Authenticate = Command<CommandTypes.AUTHENTICATE, AuthenticateSettings>;

type AuthenticateSettings = {
    username: string,
    password: string,
    shouldRemember: boolean,
    onSuccess?(): void,
    onError?(): void,
    isLoaderEnabled: boolean,
};