import { spawn, takeEvery } from "redux-saga/effects";
import { CookieStorage } from "Packages/Common/Cookie/Domain/CookieStorage";
import { handleRemoveCookie } from "Packages/Common/Cookie/Domain/Saga/RemoveCookieHandling";
import { handleSaveCookie } from "Packages/Common/Cookie/Domain/Saga/SaveCookieHandling";
import { CookieCommandTypes } from "Packages/Common/Cookie/Domain/Types";

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
