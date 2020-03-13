import {Dispatch} from 'redux';

type SaveCookieSettings = {
    name: string,
    content: string,
    timeToLiveInDays?: number,
};

export class CookieManager {
    private readonly dispatch: Dispatch;

    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
    }

    public saveCookie(settings: SaveCookieSettings): void {

    }
}