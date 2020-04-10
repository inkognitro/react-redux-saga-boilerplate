import {Command} from "Common/Domain/Bus/Command";
import {CookieCommandTypes} from "Common/Domain/Cookie/Types";

export function createRemoveCookie(name: string): RemoveCookie {
    return {
        type: CookieCommandTypes.REMOVE_COOKIE,
        payload: {
            cookieName: name
        },
    };
}

export type RemoveCookie = Command<CookieCommandTypes.REMOVE_COOKIE, {
    cookieName: string
}>;