import { Event } from "packages/entity/common-types";
import { CookieEventTypes } from "packages/common/Cookie/Domain/Event/Types";

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
