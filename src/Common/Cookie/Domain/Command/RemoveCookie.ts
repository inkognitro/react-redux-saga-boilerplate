import {CommandTypes} from "Common/Cookie/Domain/Command/CommandHandler";
import {Command} from "Common/AppBase/CommandBus";

export function createRemoveCookie(name: string): RemoveCookie {
    return {
        type: CommandTypes.REMOVE_COOKIE,
        payload: {
            cookieName: name
        },
    };
}

export type RemoveCookie = Command<CommandTypes.REMOVE_COOKIE, {
    cookieName: string
}>;