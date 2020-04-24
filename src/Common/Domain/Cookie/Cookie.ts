import { spawn } from "@redux-saga/core/effects";
import { CookieStorage } from "Common/Domain/Cookie/CookieStorage";
import { createWatchRemoveCookieFlow } from "Common/Domain/Cookie/Saga/Flow/RemoveCookieHandling";
import { createWatchSaveCookieFlow } from "Common/Domain/Cookie/Saga/Flow/SaveCookieHandling";

export function createCookieFlow(
    cookieStorage: CookieStorage,
): () => Generator {
    return function* routerSaga() {
        yield spawn(createWatchRemoveCookieFlow(cookieStorage));
        yield spawn(createWatchSaveCookieFlow(cookieStorage));
    };
}
