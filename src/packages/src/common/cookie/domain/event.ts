import { Event } from "packages/entity/common-types";
import { Cookie } from "./types";

export enum CookieEventTypes {
    COOKIE_WAS_SAVED = "COOKIE_WAS_SAVED-9266728a-7572-48cb-9ff4-2e27071e1343",
    COOKIE_WAS_REMOVED = "COOKIE_WAS_REMOVED-9266728a-7572-48cb-9ff4-2e27071e1343",
}

export function createCookieWasSaved(cookie: Cookie): CookieWasSaved {
    return {
        type: CookieEventTypes.COOKIE_WAS_SAVED,
        payload: {
            cookie,
        },
    };
}

export type CookieWasSaved = Event<CookieEventTypes.COOKIE_WAS_SAVED, {
    cookie: Cookie;
}>;

export function createCookieWasRemoved(cookieName: string): CookieWasRemoved {
    return {
        type: CookieEventTypes.COOKIE_WAS_REMOVED,
        payload: {
            cookieName,
        },
    };
}

export type CookieWasRemoved = Event<CookieEventTypes.COOKIE_WAS_REMOVED, {
    cookieName: string;
}>;
