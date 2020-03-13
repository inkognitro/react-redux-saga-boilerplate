import {CookieStorage} from "Common/Cookie/Domain/CookieStorage";
import {Cookie} from "Common/Cookie/Domain/Types";

export class BrowserCookieStorage implements CookieStorage {
    findCookieContent(cookieName: string): (null | string) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    saveCookie(settings: Cookie): void {
        const expiresCookiePart = (settings.timeToLiveInDays ? createCookieExpires(settings.timeToLiveInDays) : '');
        document.cookie = settings.name + "=" + settings.content + ";" + expiresCookiePart + ";path=/";
    }

    removeCookie(cookieName: string): void {
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
}

function createCookieExpires(timeToLiveInDays: number): string {
    let date = new Date();
    date.setTime(date.getTime() + (timeToLiveInDays * 24 * 60 * 60 * 1000));
    return 'expires=' + date.toUTCString();
}