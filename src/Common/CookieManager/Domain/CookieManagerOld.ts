import {EventBus} from "Common/Bootstrap/EventBus";
import {createCookieWasSaved} from "Common/CookieManager/Domain/Event/CookieWasSaved";
import {CookieStorage} from "Common/CookieManager/Domain/CookieStorage";
import {createCookieWasRemoved} from "Common/CookieManager/Domain/Event/CookieWasRemoved";
import {CookieContentReader} from "Common/CookieManager/Domain/Query/CookieQuery";

export type SaveCookieSettings = {
    name: string,
    content: string,
    timeToLiveInDays?: number,
};

export class CookieManagerOld {
    private readonly eventBus: EventBus;
    private readonly cookieWriter: CookieStorage;
    private readonly cookieContentReader: CookieContentReader;

    constructor(
        eventBus: EventBus,
        cookieWriter: CookieStorage,
        cookieContentReader: CookieContentReader
    ) {
        this.eventBus = eventBus;
        this.cookieWriter = cookieWriter;
        this.cookieContentReader = cookieContentReader;
    }
    
    public saveCookie(settings: SaveCookieSettings): void {
        const cookie = {
            name: settings.name,
            content: settings.content,
            timeToLiveInDays: settings.timeToLiveInDays,
        };
        this.cookieWriter.saveCookie(cookie);
        this.eventBus.handle(createCookieWasSaved(cookie));
    }

    public removeCookie(cookieName: string): void {
        const existingCookie = this.cookieContentReader.find(cookieName);
        if(existingCookie === null) {
            return;
        }
        this.cookieWriter.removeCookie(cookieName);
        this.eventBus.handle(createCookieWasRemoved(cookieName));
    }
}