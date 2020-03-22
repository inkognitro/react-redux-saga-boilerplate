import {CommandTypes} from "Common/Cookie/Domain/Command/CommandHandler";
import {Command} from "Common/AppBase/CommandBus";
import {SaveCookieSettings} from "Common/Cookie/Domain/CookieManager";

export function createSaveCookie(settings: SaveCookieSettings): SaveCookie {
    return {
        type: CommandTypes.SAVE_COOKIE,
        payload: settings,
    };
}

export type SaveCookie = Command<CommandTypes.SAVE_COOKIE, SaveCookieSettings>;