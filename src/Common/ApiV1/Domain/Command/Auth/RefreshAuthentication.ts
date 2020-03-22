import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/ApiV1/Domain/Command/CommandHandler";
import {User} from "Common/UserManagement/Domain/UserRepository/Types";
import {BasicResponseBody} from "Common/ApiV1/Domain/Types";

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