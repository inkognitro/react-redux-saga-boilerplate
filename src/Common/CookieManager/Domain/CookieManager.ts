import {call, put, spawn} from "@redux-saga/core/effects";
import {createWatchOpenUrlSaga} from "Common/Router/Domain/Commands/OpenUrl";
import {CookieStorage} from "Common/CookieManager/Domain/CookieStorage";

export enum CommandTypes {
    SAVE_COOKIE = 'SAVE_COOKIE-d12895c4-7a9c-423d-b01d-c4be1d770468',
    REMOVE_COOKIE = 'REMOVE_COOKIE-d12895c4-7a9c-423d-b01d-c4be1d770468',
}

export function createRouterSaga(cookieStorage: CookieStorage): () => Generator {
    return function* routerSaga() {
        yield spawn(watchCurrentUrlChange);
        yield spawn(createWatchOpenUrlSaga(routerStateSelector, historyManager));
    }
}