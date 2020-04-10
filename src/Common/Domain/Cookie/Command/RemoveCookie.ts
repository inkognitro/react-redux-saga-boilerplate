import {CookieCommandTypes} from "Common/Domain/Cookie/Cookie";
import {Command} from "Common/Domain/Bus/Command";
import {CookieStorage} from "Common/Domain/Cookie/CookieStorage";
import {put, takeEvery} from "@redux-saga/core/effects";
import {createCookieWasRemoved} from "Common/Domain/Cookie/Event/CookieWasRemoved";

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