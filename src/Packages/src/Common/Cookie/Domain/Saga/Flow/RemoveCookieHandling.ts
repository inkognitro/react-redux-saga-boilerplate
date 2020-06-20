import { put } from "redux-saga/effects";
import { CookieStorage } from "../../Types";
import { RemoveCookie } from "../../Command/RemoveCookie";
import { createCookieWasRemoved } from "../../Event/CookieWasRemoved";

export function* handleRemoveCookie(cookieStorage: CookieStorage, command: RemoveCookie): Generator {
    if (!cookieStorage.findCookieContent(command.payload.cookieName)) {
        return;
    }
    cookieStorage.removeCookie(command.payload.cookieName);
    yield put(createCookieWasRemoved(command.payload.cookieName));
}
