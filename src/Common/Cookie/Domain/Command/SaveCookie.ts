import {CommandTypes} from "Common/Cookie/Domain/Command/CommandHandler";
import {Command, CommandAction, createCommandAction} from "Common/AppBase/CommandBus";
import {SaveCookieSettings} from "Common/Cookie/Domain/CookieManager";

export function createSaveCookieCommandAction(settings: SaveCookieSettings): CommandAction {
    const command: SaveCookie = {
        type: CommandTypes.SAVE_COOKIE,
        payload: settings,
    };
    return createCommandAction(command);
}

export type SaveCookie = Command<CommandTypes.SAVE_COOKIE, SaveCookieSettings>;