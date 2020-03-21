import {CookieReader} from "Common/Cookie/Domain/Query/CookieReader";

export type CookieContentQuery = {
    cookieName: string,
};

export class CookieContentSelector {
    private readonly cookieReader: CookieReader;

    constructor(cookieReader: CookieReader) {
        this.cookieReader = cookieReader;
    }

    find(query: CookieContentQuery): (null | string) {
        return this.cookieReader.findCookieContent(query.cookieName);
    }
}