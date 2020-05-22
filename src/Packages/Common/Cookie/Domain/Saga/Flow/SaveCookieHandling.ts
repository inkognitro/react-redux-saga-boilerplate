import { put } from "redux-saga/effects";
import { createCookieWasSaved } from "Packages/Common/Cookie/Domain/Event/CookieWasSaved";
import { SaveCookie } from "Packages/Common/Cookie/Domain/Command/SaveCookie";
import { CookieStorage } from "Packages/Common/Cookie";

export function* handleSaveCookie(cookieStorage: CookieStorage, command: SaveCookie): Generator {
    cookieStorage.saveCookie(command.payload.cookie);
    yield put(createCookieWasSaved(command.payload.cookie));
}
