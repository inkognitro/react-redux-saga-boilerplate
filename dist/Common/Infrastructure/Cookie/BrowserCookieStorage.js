"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BrowserCookieStorage {
    findCookieContent(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieFragments = decodedCookie.split(';');
        let cookieFragment = null;
        for (let index = 0; index < cookieFragments.length; index++) {
            cookieFragment = cookieFragments[index];
            while (cookieFragment.charAt(0) === ' ') {
                cookieFragment = cookieFragment.substring(1);
            }
            if (cookieFragment.indexOf(name) === 0) {
                return cookieFragment.substring(name.length, cookieFragment.length);
            }
        }
        return null;
    }
    saveCookie(settings) {
        const expiresCookiePart = (settings.timeToLiveInDays ? createCookieExpires(settings.timeToLiveInDays) : '');
        document.cookie = settings.name + "=" + settings.content + ";" + expiresCookiePart + ";path=/";
    }
    removeCookie(cookieName) {
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
}
exports.BrowserCookieStorage = BrowserCookieStorage;
function createCookieExpires(timeToLiveInDays) {
    let date = new Date();
    date.setTime(date.getTime() + (timeToLiveInDays * 24 * 60 * 60 * 1000));
    return 'expires=' + date.toUTCString();
}
//# sourceMappingURL=BrowserCookieStorage.js.map