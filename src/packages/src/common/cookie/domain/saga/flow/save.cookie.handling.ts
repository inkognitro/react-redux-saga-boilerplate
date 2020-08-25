import { put } from "redux-saga/effects";
import { CookieStorage } from "../../types";
import { createCookieWasSaved } from "../../event";
import { SaveCookie } from "../../command";

export function* handleSaveCookie(cookieStorage: CookieStorage, command: SaveCookie): Generator {
    cookieStorage.saveCookie(command.payload.cookie);
    yield put(createCookieWasSaved(command.payload.cookie));
}
