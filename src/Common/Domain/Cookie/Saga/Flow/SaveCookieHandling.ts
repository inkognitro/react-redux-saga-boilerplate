import { CookieStorage } from "Common/Domain/Cookie/CookieStorage";
import { put, takeEvery } from "redux-saga/effects";
import { createCookieWasSaved } from "Common/Domain/Cookie/Event/CookieWasSaved";
import { CookieCommandTypes } from "Common/Domain/Cookie/Types";
import { SaveCookie } from "Common/Domain/Cookie/Command/SaveCookie";

export function createWatchSaveCookieFlow(
    cookieStorage: CookieStorage,
): () => Generator {
    return function* (): Generator {
        yield takeEvery(CookieCommandTypes.SAVE_COOKIE, function* (command: SaveCookie): Generator {
            cookieStorage.saveCookie(command.payload.cookie);
            yield put(createCookieWasSaved(command.payload.cookie));
        });
    };
}
