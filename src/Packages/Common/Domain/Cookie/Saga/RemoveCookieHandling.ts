import { CookieStorage } from "Packages/Common/Domain/Cookie/CookieStorage";
import { put } from "redux-saga/effects";
import { createCookieWasRemoved } from "Packages/Common/Domain/Cookie/Event/CookieWasRemoved";
import { RemoveCookie } from "Packages/Common/Domain/Cookie/Command/RemoveCookie";

export function* handleRemoveCookie(cookieStorage: CookieStorage, command: RemoveCookie): Generator {
    if (!cookieStorage.findCookieContent(command.payload.cookieName)) {
        return;
    }
    cookieStorage.removeCookie(command.payload.cookieName);
    yield put(createCookieWasRemoved(command.payload.cookieName));
}
