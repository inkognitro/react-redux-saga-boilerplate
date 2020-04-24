import { Cookie, CookieEventTypes } from "Common/Domain/Cookie/Types";
import { Event } from "Common/Domain/Bus/Event";

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
