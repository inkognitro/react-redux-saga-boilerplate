import {Cookie} from "Common/Cookie/Domain/Types";
import {CookieReader} from "Common/Cookie/Domain/Query/CookieReader";

export interface CookieStorage extends CookieReader {
    saveCookie(settings: Cookie): void
    removeCookie(cookieName: string): void
}