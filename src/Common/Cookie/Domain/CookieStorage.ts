import {Cookie} from "Common/Cookie/Domain/Types";

export interface CookieStorage {
    findCookieContent(cookieName: string): (null | string)
    saveCookie(settings: Cookie): void
    removeCookie(cookieName: string): void
}