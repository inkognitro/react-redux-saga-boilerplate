import {CommandTypes} from "Common/ApiV1WIP/Domain/Command/CommandHandler";
import {BasicResponseBody} from "Common/ApiV1WIP/Domain/Types";
import {User} from "Common/Model/Domain/User";
import {Command} from "Common/Bootstrap/Domain/Command";

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