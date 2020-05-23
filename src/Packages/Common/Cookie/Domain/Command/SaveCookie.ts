import { Cookie, CookieCommandTypes } from "Packages/Common/Cookie/Domain/Types";
import { Command } from "Packages/Common/CommonTypes";

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
