import { CookieStorage } from "Packages/Common/Domain/Cookie/CookieStorage";
import { put } from "redux-saga/effects";
import { createCookieWasSaved } from "Packages/Common/Domain/Cookie/Event/CookieWasSaved";
import { SaveCookie } from "Packages/Common/Domain/Cookie/Command/SaveCookie";

export function* handleSaveCookie(cookieStorage: CookieStorage, command: SaveCookie): Generator {
    cookieStorage.saveCookie(command.payload.cookie);
    yield put(createCookieWasSaved(command.payload.cookie));
}
