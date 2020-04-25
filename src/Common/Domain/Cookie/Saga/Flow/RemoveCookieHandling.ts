import { CookieStorage } from "Common/Domain/Cookie/CookieStorage";
import { put, takeEvery } from "redux-saga/effects";
import { createCookieWasRemoved } from "Common/Domain/Cookie/Event/CookieWasRemoved";
import { CookieCommandTypes } from "Common/Domain/Cookie/Types";
import { RemoveCookie } from "Common/Domain/Cookie/Command/RemoveCookie";

export function createWatchRemoveCookieFlow(
    cookieStorage: CookieStorage,
): () => Generator {
    return function* (): Generator {
        yield takeEvery(CookieCommandTypes.REMOVE_COOKIE, function* (command: RemoveCookie): Generator {
            if (!cookieStorage.findCookieContent(command.payload.cookieName)) {
                return;
            }
            cookieStorage.removeCookie(command.payload.cookieName);
            yield put(createCookieWasRemoved(command.payload.cookieName));
        });
    };
}
