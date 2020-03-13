import {Event} from 'Common/AppBase/EventBus';
import {Cookie, CookieEventTypes} from 'Common/Cookie/Domain/Types';

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