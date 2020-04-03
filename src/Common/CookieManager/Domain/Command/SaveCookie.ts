import {CommandTypes} from "Common/CookieManager/Domain/CookieManager";
import {SaveCookieSettings} from "Common/CookieManager/Domain/CookieManagerOld";
import {Command} from "Common/Bootstrap/Command";

export function createSaveCookie(settings: SaveCookieSettings): SaveCookie {
    return {
        type: CommandTypes.SAVE_COOKIE,
        payload: settings,
    };
}

export type SaveCookie = Command<CommandTypes.SAVE_COOKIE, SaveCookieSettings>;