import {CookieWasSaved} from "Common/Cookie/Domain/Event/CookieWasSaved";

export type Cookie = {
    //todo!
};

export enum CookieEventTypes {
    COOKIE_WAS_SAVED = 'COOKIE_WAS_SAVED-9266728a-7572-48cb-9ff4-2e27071e1343',
}

export type CookieEvents = (
    CookieWasSaved
);