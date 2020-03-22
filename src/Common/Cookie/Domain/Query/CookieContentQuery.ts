import {CookieReader} from "Common/Cookie/Domain/Query/CookieReader";

export type CookieContentQuery = {
    cookieName: string,
};

export class CookieContentReader {
    private readonly cookieReader: CookieReader;

    constructor(cookieReader: CookieReader) {
        this.cookieReader = cookieReader;
    }

    find(cookieName: string): (null | string) {
        return this.cookieReader.findCookieContent(cookieName);
    }
}