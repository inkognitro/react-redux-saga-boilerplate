import { Command } from "Packages/Entity/CommonTypes";
import { Cookie } from "../Types";
import { CookieCommandTypes } from "./Types";

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
