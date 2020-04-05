import {CommandTypes} from "Common/ApiV1WIP/Domain/ApiV1";
import {BasicResponseBody} from "Common/ApiV1WIP/Domain/Types";
import {User} from "Common/Model/Domain/User";
import {Command} from "Common/Bootstrap/Domain/Command";

export function createRefreshAuthentication(settings: RefreshAuthenticationSettings): RefreshAuthentication {
    return {
        type: CommandTypes.REFRESH_AUTHENTICATION,
        payload: settings,
    };
}

export type RefreshAuthentication = Command<CommandTypes.REFRESH_AUTHENTICATION, RefreshAuthenticationSettings>;

export type SuccessResult = {
    token: string,
    user: User
};

export type ErrorResult = BasicResponseBody;

type RefreshAuthenticationSettings = {
    token: string,
    isLoaderEnabled: boolean,
    onSuccess?(result: SuccessResult): void,
    onError?(result?: ErrorResult): void,
};