import { spawn, takeEvery } from "redux-saga/effects";
import { CookieStorage } from "Common/Domain/Cookie/CookieStorage";
import { handleRemoveCookie } from "Common/Domain/Cookie/Saga/RemoveCookieHandling";
import { handleSaveCookie } from "Common/Domain/Cookie/Saga/SaveCookieHandling";
import { CookieCommandTypes } from "Common/Domain/Cookie/Types";

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
