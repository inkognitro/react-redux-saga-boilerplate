import {CommandTypes} from "Common/Cookie/Domain/Command/CommandHandler";
import {SaveCookieSettings} from "Common/Cookie/Domain/CookieManager";
import {Command} from "Common/Bootstrap/Command";

export function createSaveCookie(settings: SaveCookieSettings): SaveCookie {
    return {
        type: CommandTypes.SAVE_COOKIE,
        payload: settings,
    };
}

export type SaveCookie = Command<CommandTypes.SAVE_COOKIE, SaveCookieSettings>;