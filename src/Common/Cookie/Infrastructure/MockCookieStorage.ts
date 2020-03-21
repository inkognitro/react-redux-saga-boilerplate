import {CookieWriter} from "Common/Cookie/Domain/CookieWriter";
import {Cookie} from "Common/Cookie/Domain/Types";
import {CookieReader} from "Common/Cookie/Domain/Query/CookieReader";

export class MockCookieStorage implements CookieWriter, CookieReader {
    findCookieContent(_: string): (null | string) {
        return null;
    }

    saveCookie(_: Cookie): void {
    }

    removeCookie(_: string): void {
    }
}