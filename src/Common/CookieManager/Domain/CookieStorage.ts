import {Cookie} from "Common/CookieManager/Domain/Types";
import {CookieReader} from "Common/CookieManager/Domain/Query/CookieReader";

export interface CookieStorage extends CookieReader {
    saveCookie(settings: Cookie): void
    removeCookie(cookieName: string): void
}