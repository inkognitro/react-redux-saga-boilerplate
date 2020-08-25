import { put } from "redux-saga/effects";
import { createCookieWasRemoved } from "../../event";
import { RemoveCookie } from "../../command";
import { CookieStorage } from "../../types";

export function* handleRemoveCookie(cookieStorage: CookieStorage, command: RemoveCookie): Generator {
    if (!cookieStorage.findCookieContent(command.payload.cookieName)) {
        return;
    }
    cookieStorage.removeCookie(command.payload.cookieName);
    yield put(createCookieWasRemoved(command.payload.cookieName));
}
