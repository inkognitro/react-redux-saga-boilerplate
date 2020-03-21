import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/ApiV1/Domain/Command/CommandHandler";
import {User} from "Common/UserManagement/Domain/UserRepository/Types";
import {BasicResponseBody} from "Common/ApiV1/Domain/Types";

export function createRefreshToken(settings: RefreshTokenSettings): RefreshToken {
    return {
        type: CommandTypes.REFRESH_TOKEN,
        payload: settings,
};
}

export type RefreshToken = Command<CommandTypes.REFRESH_TOKEN, RefreshTokenSettings>;

type SuccessResult = {
    token: string,
    user: User
};

type ErrorResult = BasicResponseBody;

type RefreshTokenSettings = {
    token: string,
    isLoaderEnabled: boolean,
    onSuccess?(result: SuccessResult): void,
    onError?(result?: ErrorResult): void,
};