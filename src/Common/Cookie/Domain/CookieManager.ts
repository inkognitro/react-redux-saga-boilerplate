import {EventBus} from "Common/AppBase/EventBus";
import {createCookieWasSaved} from "Common/Cookie/Domain/Event/CookieWasSaved";
import {CookieStorage} from "Common/Cookie/Domain/CookieStorage";

export type SaveCookieSettings = {
    name: string,
    content: string,
    timeToLiveInDays?: number,
};

export class CookieManager {
    private readonly eventBus: EventBus;
    private readonly cookieStorage: CookieStorage;

    constructor(eventBus: EventBus, cookieStorage: CookieStorage) {
        this.eventBus = eventBus;
        this.cookieStorage = cookieStorage;
    }

    public saveCookie(settings: SaveCookieSettings): void {
        const cookie = {
            name: settings.name,
            content: settings.content,
            timeToLiveInDays: settings.timeToLiveInDays,
        };
        this.cookieStorage.saveCookie(cookie);
        this.eventBus.handle(createCookieWasSaved(cookie));
    }
}