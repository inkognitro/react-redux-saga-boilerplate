import {CookieWasSaved} from "Common/Cookie/Domain/Event/CookieWasSaved";
import {CookieWasRemoved} from "Common/Cookie/Domain/Event/CookieWasRemoved";

export type Cookie = {
    name: string,
    content: string,
    timeToLiveInDays?: number,
};

export enum CookieEventTypes {
    COOKIE_WAS_SAVED = 'COOKIE_WAS_SAVED-9266728a-7572-48cb-9ff4-2e27071e1343',
    COOKIE_WAS_REMOVED = 'COOKIE_WAS_REMOVED-9266728a-7572-48cb-9ff4-2e27071e1343',
}

export type CookieEvent = (CookieWasSaved | CookieWasRemoved);