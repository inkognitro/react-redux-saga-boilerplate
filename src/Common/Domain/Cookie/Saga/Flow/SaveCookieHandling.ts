import {CookieStorage} from "Common/Domain/Cookie/CookieStorage";
import {put, takeEvery} from "@redux-saga/core/effects";
import {createCookieWasSaved} from "Common/Domain/Cookie/Event/CookieWasSaved";
import {CookieCommandTypes} from "Common/Domain/Cookie/Types";
import {SaveCookie} from "Common/Domain/Cookie/Command/SaveCookie";

export function createWatchSaveCookieFlow(cookieStorage: CookieStorage): GeneratorFunction {
    const handleSaveCookie = function* (command: SaveCookie): Generator {
        cookieStorage.saveCookie(command.payload.cookie);
        yield put(createCookieWasSaved(command.payload.cookie));
    };

    return <GeneratorFunction>function* (): Generator {
        yield takeEvery(CookieCommandTypes.SAVE_COOKIE, handleSaveCookie);
    }
}