import {EventBus} from "Common/Bootstrap/EventBus";
import {createCookieWasSaved} from "Common/Cookie/Domain/Event/CookieWasSaved";
import {CookieWriter} from "Common/Cookie/Domain/CookieWriter";
import {createCookieWasRemoved} from "Common/Cookie/Domain/Event/CookieWasRemoved";
import {CookieContentReader} from "Common/Cookie/Domain/Query/CookieContentQuery";

export type SaveCookieSettings = {
    name: string,
    content: string,
    timeToLiveInDays?: number,
};

export class CookieManager {
    private readonly eventBus: EventBus;
    private readonly cookieWriter: CookieWriter;
    private readonly cookieContentReader: CookieContentReader;

    constructor(
        eventBus: EventBus,
        cookieWriter: CookieWriter,
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