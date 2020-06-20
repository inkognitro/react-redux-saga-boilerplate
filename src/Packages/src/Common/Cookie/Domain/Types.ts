export type Cookie = {
    name: string;
    content: string;
    timeToLiveInDays?: number;
};

export interface CookieReader {
    findCookieContent(cookieName: string): null | string;
}

export interface CookieStorage extends CookieReader {
    saveCookie(settings: Cookie): void;
    removeCookie(cookieName: string): void;
}
