import { spawn } from "redux-saga/effects";
import { CookieStorage } from "Common/Domain/Cookie/CookieStorage";
import { createWatchRemoveCookieFlow } from "Common/Domain/Cookie/Saga/Flow/RemoveCookieHandling";
import { createWatchSaveCookieFlow } from "Common/Domain/Cookie/Saga/Flow/SaveCookieHandling";

export function createCookieFlow(
    cookieStorage: CookieStorage,
): () => Generator {
    return function* (): Generator {
        yield spawn(createWatchRemoveCookieFlow(cookieStorage));
        yield spawn(createWatchSaveCookieFlow(cookieStorage));
    };
}
