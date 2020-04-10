import {Cookie} from "Common/Domain/Cookie/Types";
import {CookieReader} from "Common/Domain/Cookie/Query/CookieReader";

export interface CookieStorage extends CookieReader {
    saveCookie(settings: Cookie): void
    removeCookie(cookieName: string): void
}