export type CookieSettings = {
    name: string,
    content: string,
    timeToLiveInDays?: number,
};

export interface CookieStorageInterface {
    findCookieContent(cookieName: string): (null | string)
    setCookie(settings: CookieSettings): void
    removeCookie(cookieName: string): void
}