import {CookieCommandTypes} from "Common/Cookie/Domain/Cookie";
import {Command} from "Common/Bus/Domain/Command";
import {CookieStorage} from "Common/Cookie/Domain/CookieStorage";
import {put, takeEvery} from "@redux-saga/core/effects";
import {createCookieWasRemoved} from "Common/Cookie/Domain/Event/CookieWasRemoved";

export function createWatchRemoveCookieSaga(cookieStorage: CookieStorage): GeneratorFunction {
    const handleRemoveCookie = function* (command: RemoveCookie): Generator {
        if(!cookieStorage.findCookieContent(command.payload.cookieName)) {
            return;
        }
        cookieStorage.removeCookie(command.payload.cookieName);
        yield put(createCookieWasRemoved(command.payload.cookieName));
    };

    return <GeneratorFunction>function* watchRemoveCookie(): Generator {
        yield takeEvery(CookieCommandTypes.REMOVE_COOKIE, handleRemoveCookie);
    }
}

export function createRemoveCookie(name: string): RemoveCookie {
    return {
        type: CookieCommandTypes.REMOVE_COOKIE,
        payload: {
            cookieName: name
        },
    };
}

export type RemoveCookie = Command<CookieCommandTypes.REMOVE_COOKIE, {
    cookieName: string
}>;