import {CommandTypes} from "Common/Cookie/Domain/Command/CommandHandler";
import {Command, CommandAction, createCommandAction} from "Common/AppBase/CommandBus";

export function createRemoveCookieAction(name: string): CommandAction {
    const command: RemoveCookie = {
        type: CommandTypes.REMOVE_COOKIE,
        payload: {
            cookieName: name
        },
    };
    return createCommandAction(command);
}

export type RemoveCookie = Command<CommandTypes.REMOVE_COOKIE, {
    cookieName: string
}>;