import {EventBus} from "Common/AppBase/EventBus";
import {createCookieWasSaved} from "Common/Cookie/Domain/Event/CookieWasSaved";
import {CookieWriter} from "Common/Cookie/Domain/CookieWriter";
import {CookieReader} from "Common/Cookie/Domain/CookieReader";
import {createCookieWasRemoved} from "Common/Cookie/Domain/Event/CookieWasRemoved";

export type SaveCookieSettings = {
    name: string,
    content: string,
    timeToLiveInDays?: number,
};

export class CookieManager {
    private readonly eventBus: EventBus;
    private readonly cookieWriter: CookieWriter;
    private readonly cookieReader: CookieReader;

    constructor(eventBus: EventBus, cookieWriter: CookieWriter, cookieReader: CookieReader) {
        this.eventBus = eventBus;
        this.cookieWriter = cookieWriter;
        this.cookieReader = cookieReader;
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
        const existingCookie = this.cookieReader.findCookieContent(cookieName);
        if(existingCookie === null) {
            return;
        }
        this.cookieWriter.removeCookie(cookieName);
        this.eventBus.handle(createCookieWasRemoved(cookieName));
    }
}