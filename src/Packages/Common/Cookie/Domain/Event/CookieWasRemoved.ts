import { Event } from "Packages/Entity/CommonTypes";
import { CookieEventTypes } from "../Types";

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
