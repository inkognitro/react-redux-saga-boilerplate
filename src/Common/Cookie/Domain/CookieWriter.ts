import {Cookie} from "Common/Cookie/Domain/Types";

export interface CookieWriter {
    saveCookie(settings: Cookie): void
    removeCookie(cookieName: string): void
}