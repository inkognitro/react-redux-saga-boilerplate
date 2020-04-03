import {Cookie, CookieEventTypes} from 'Common/CookieManager/Domain/Types';
import {Event} from "Common/Bootstrap/Event";

export function createCookieWasSaved(cookie: Cookie): CookieWasSaved {
    return {
        type: CookieEventTypes.COOKIE_WAS_SAVED,
        payload: {
            cookie: cookie,
        }
    };
}

export type CookieWasSaved = Event<CookieEventTypes.COOKIE_WAS_SAVED, {
    cookie: Cookie,
}>;