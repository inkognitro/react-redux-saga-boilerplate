import { Cookie, CookieStorage } from "Packages/Common/Cookie/Domain";

export class BrowserCookieStorage implements CookieStorage {
    findCookieContent(cookieName: string): null | string {
        const name = `${cookieName}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieFragments = decodedCookie.split(";");
        let cookieFragment = null;
        for (let index = 0; index < cookieFragments.length; index++) {
            cookieFragment = cookieFragments[index];
            while (cookieFragment.charAt(0) === " ") {
                cookieFragment = cookieFragment.substring(1);
            }
            if (cookieFragment.indexOf(name) === 0) {
                return cookieFragment.substring(name.length, cookieFragment.length);
            }
        }
        return null;
    }

    saveCookie(settings: Cookie): void {
        const expiresCookiePart = settings.timeToLiveInDays
            ? createCookieExpires(settings.timeToLiveInDays)
            : "";
        document.cookie = `${settings.name}=${settings.content};${expiresCookiePart};path=/`;
    }

    removeCookie(cookieName: string): void {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

function createCookieExpires(timeToLiveInDays: number): string {
    const date = new Date();
    date.setTime(date.getTime() + timeToLiveInDays * 24 * 60 * 60 * 1000);
    return `expires=${date.toUTCString()}`;
}
