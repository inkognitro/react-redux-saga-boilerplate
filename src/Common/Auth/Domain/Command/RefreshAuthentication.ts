import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/Auth/Domain/Command/CommandHandler";

export function createRefreshAuthentication(): RefreshAuthentication {
    return {
        type: CommandTypes.REFRESH_AUTHENTICATION,
        payload: null,
    };
}

export type RefreshAuthentication = Command<CommandTypes.REFRESH_AUTHENTICATION>;