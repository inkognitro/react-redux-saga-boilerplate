import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/ApiV1/Domain/Command/CommandHandler";
import {User} from "Common/UserManagement/Domain/UserRepository/Types";
import {BasicResponseBody} from "Common/ApiV1/Domain/Types";

export function createAuthenticate(settings: AuthenticateSettings): Authenticate {
    return {
        type: CommandTypes.AUTHENTICATE,
        payload: settings,
    };
}

export type Authenticate = Command<CommandTypes.AUTHENTICATE, AuthenticateSettings>;

export type SuccessResult = {
    token: string,
    user: User
};

export type ErrorResult = BasicResponseBody;

type AuthenticateSettings = {
    username: string,
    password: string,
    isLoaderEnabled: boolean,
    onSuccess?(result: SuccessResult): void,
    onError?(result?: ErrorResult): void,
};