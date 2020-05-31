import { put } from "redux-saga/effects";
import { SaveCookie, CookieStorage } from "Packages/Common/Cookie";
import { createCookieWasSaved } from "../../Event/CookieWasSaved";

export function* handleSaveCookie(cookieStorage: CookieStorage, command: SaveCookie): Generator {
    cookieStorage.saveCookie(command.payload.cookie);
    yield put(createCookieWasSaved(command.payload.cookie));
}
