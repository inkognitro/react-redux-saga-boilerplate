import { Event } from "Packages/Common/CommonTypes";
import { Cookie, CookieEventTypes } from "../Types";

export function createCookieWasSaved(cookie: Cookie): CookieWasSaved {
    return {
        type: CookieEventTypes.COOKIE_WAS_SAVED,
        payload: {
            cookie,
        },
    };
}

export type CookieWasSaved = Event<
  CookieEventTypes.COOKIE_WAS_SAVED,
  {
    cookie: Cookie;
  }
>;
