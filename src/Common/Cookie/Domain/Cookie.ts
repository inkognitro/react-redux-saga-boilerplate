import {spawn} from "@redux-saga/core/effects";
import {CookieStorage} from "Common/Cookie/Domain/CookieStorage";
import {createWatchRemoveCookieSaga} from "Common/Cookie/Domain/Command/RemoveCookie";
import {createWatchSaveCookieSaga} from "Common/Cookie/Domain/Command/SaveCookie";

export enum CookieCommandTypes {
    SAVE_COOKIE = 'SAVE_COOKIE-d12895c4-7a9c-423d-b01d-c4be1d770468',
    REMOVE_COOKIE = 'REMOVE_COOKIE-d12895c4-7a9c-423d-b01d-c4be1d770468',
}

export function createCookieSaga(cookieStorage: CookieStorage): () => Generator {
    return function* routerSaga() {
        yield spawn(createWatchRemoveCookieSaga(cookieStorage));
        yield spawn(createWatchSaveCookieSaga(cookieStorage));
    }
}