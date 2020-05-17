import { CookieEventTypes } from "Packages/Common/Domain/Cookie/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

export function createCookieWasRemoved(cookieName: string): CookieWasRemoved {
    return {
        type: CookieEventTypes.COOKIE_WAS_REMOVED,
        payload: {
            cookieName,
        },
    };
}

export type CookieWasRemoved = Event<
  CookieEventTypes.COOKIE_WAS_REMOVED,
  {
    cookieName: string;
  }
>;
