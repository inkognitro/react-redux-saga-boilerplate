import { spawn, takeEvery } from "@redux-saga/core/effects";
import { CookieCommandTypes, CookieStorage } from "Packages/Common/Cookie";
import { handleSaveCookie } from "Packages/Common/Cookie/Domain/Saga/Flow/SaveCookieHandling";
import { handleRemoveCookie } from "Packages/Common/Cookie/Domain/Saga/Flow/RemoveCookieHandling";

export function createCookieSaga(
    cookieStorage: CookieStorage,
): () => Generator {
    return function* (): Generator {
        yield spawn(watchRemoveCookieCommands, cookieStorage);
        yield spawn(watchSaveCookieCommands, cookieStorage);
    };
}

function* watchSaveCookieCommands(cookieStorage: CookieStorage): Generator {
    yield takeEvery(CookieCommandTypes.SAVE_COOKIE, handleSaveCookie, cookieStorage);
}

function* watchRemoveCookieCommands(cookieStorage: CookieStorage): Generator {
    yield takeEvery(CookieCommandTypes.REMOVE_COOKIE, handleRemoveCookie, cookieStorage);
}
