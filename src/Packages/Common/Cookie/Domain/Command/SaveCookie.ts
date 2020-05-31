import { Command } from "Packages/Common/CommonTypes";
import { Cookie, CookieCommandTypes } from "../Types";

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
