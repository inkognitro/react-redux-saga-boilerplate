import {CookieCommandTypes} from "Common/Cookie/Domain/Cookie";
import {Command} from "Common/Bootstrap/Domain/Command";
import {put, takeEvery} from "@redux-saga/core/effects";
import {CookieStorage} from "Common/Cookie/Domain/CookieStorage";
import {createCookieWasSaved} from "Common/Cookie/Domain/Event/CookieWasSaved";
import {Cookie} from "Common/Cookie/Domain/Types";

export function createWatchSaveCookieSaga(cookieStorage: CookieStorage): GeneratorFunction {
    const handleSaveCookie = function* (command: SaveCookie): Generator {
        cookieStorage.saveCookie(command.payload.cookie);
        yield put(createCookieWasSaved(command.payload.cookie));
    };

    return <GeneratorFunction>function* watchSaveCookie(): Generator {
        yield takeEvery(CookieCommandTypes.SAVE_COOKIE, handleSaveCookie);
    }
}

export function createSaveCookie(cookie: Cookie): SaveCookie {
    return {
        type: CookieCommandTypes.SAVE_COOKIE,
        payload: {
            cookie: cookie,
        },
    };
}

export type SaveCookie = Command<CookieCommandTypes.SAVE_COOKIE, {
    cookie: Cookie,
}>;