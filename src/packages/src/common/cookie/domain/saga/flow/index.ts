import { spawn, takeEvery } from "@redux-saga/core/effects";
import { CookieStorage } from "../../types";
import { handleSaveCookie } from "./save.cookie.handling";
import { handleRemoveCookie } from "./remove.cookie.handling";
import { CookieCommandTypes } from "../../command";

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
