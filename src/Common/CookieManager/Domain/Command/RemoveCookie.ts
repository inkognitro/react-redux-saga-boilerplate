import {CommandTypes} from "Common/CookieManager/Domain/CookieManager";
import {Command} from "Common/Bootstrap/Command";

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