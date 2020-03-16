import {Event} from 'Common/AppBase/EventBus';
import {CookieEventTypes} from 'Common/Cookie/Domain/Types';

export function createCookieWasRemoved(cookieName: string): CookieWasRemoved {
    return {
        type: CookieEventTypes.COOKIE_WAS_REMOVED,
        payload: {
            cookieName: cookieName,
        }
    };
}

export type CookieWasRemoved = Event<CookieEventTypes.COOKIE_WAS_REMOVED, {
    cookieName: string,
}>;