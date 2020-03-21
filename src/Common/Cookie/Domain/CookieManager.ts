import {EventBus} from "Common/AppBase/EventBus";
import {createCookieWasSaved} from "Common/Cookie/Domain/Event/CookieWasSaved";
import {CookieWriter} from "Common/Cookie/Domain/CookieWriter";
import {createCookieWasRemoved} from "Common/Cookie/Domain/Event/CookieWasRemoved";
import {CookieContentSelector} from "Common/Cookie/Domain/Query/CookieContentQuery";

export type SaveCookieSettings = {
    name: string,
    content: string,
    timeToLiveInDays?: number,
};

export class CookieManager {
    private readonly eventBus: EventBus;
    private readonly cookieWriter: CookieWriter;
    private readonly cookieContentQueryHandler: CookieContentSelector;

    constructor(
        eventBus: EventBus,
        cookieWriter: CookieWriter,
        cookieContentQueryHandler: CookieContentSelector
    ) {
        this.eventBus = eventBus;
        this.cookieWriter = cookieWriter;
        this.cookieContentQueryHandler = cookieContentQueryHandler;
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
        const existingCookie = this.cookieContentQueryHandler.find({cookieName: cookieName});
        if(existingCookie === null) {
            return;
        }
        this.cookieWriter.removeCookie(cookieName);
        this.eventBus.handle(createCookieWasRemoved(cookieName));
    }
}