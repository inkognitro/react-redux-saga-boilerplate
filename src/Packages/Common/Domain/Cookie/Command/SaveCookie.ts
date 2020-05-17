import { Command } from "Packages/Common/Domain/Bus/Command";
import { Cookie, CookieCommandTypes } from "Packages/Common/Domain/Cookie/Types";

export function createSaveCookie(cookie: Cookie): SaveCookie {
    return {
        type: CookieCommandTypes.SAVE_COOKIE,
        payload: {
            cookie,
        },
    };
}

export type SaveCookie = Command<
  CookieCommandTypes.SAVE_COOKIE,
  {
    cookie: Cookie;
  }
>;
