import {
    call, cancelled, put, select,
} from "@redux-saga/core/effects";
import { authenticateAtEndpoint, AuthenticateResult } from "packages/common/http-api-v1/domain";
import { createSaveCookie } from "packages/common/cookie/domain";
import { ResultTypes } from "packages/entity/common-types";
import { AuthUserTypes } from "packages/entity/auth-user/domain";
import { AuthState, AuthStateSelector } from "../../types";
import { Login } from "../../command";
import {
    createUserLoginFailed,
    createUserLoginWasCancelled,
    createUserLoginWasNotExecuted, createUserWasLoggedIn,
} from "../../event";
import { getCurrentAuthUser } from "../../query";

export const authTokenCookieTimeToLiveInDays = 14;

export const authTokenCookieName = 'authUserToken';
export const shouldRememberAuthTokenCookieName = 'shouldRememberAuthUserToken';

export function* handleLogin(authStateSelector: AuthStateSelector, command: Login): Generator {
    // @ts-ignore
    const authState: AuthState = yield select(authStateSelector);
    const currentAuthUser = getCurrentAuthUser(authState);
    if (currentAuthUser.type === AuthUserTypes.AUTHENTICATED_USER) {
        yield put(createUserLoginWasNotExecuted(command.payload));
        return;
    }
    try {
        // @ts-ignore
        const result: AuthenticateResult = yield call(authenticateAtEndpoint, {
            username: command.payload.username,
            password: command.payload.password,
        });
        if (result.type === ResultTypes.ERROR) {
            yield put(createUserLoginFailed(command.payload, result));
            return;
        }
        yield saveAuthCookies(result.data.authUser.token, command.payload.shouldRemember);
        yield put(createUserWasLoggedIn(command.payload, result));
        return;
    } finally {
        if (yield cancelled()) {
            yield put(createUserLoginWasCancelled(command.payload));
        }
    }
}

export function* saveAuthCookies(token: string, shouldRemember: boolean): Generator {
    const cookieTTL = (shouldRemember ? authTokenCookieTimeToLiveInDays : undefined);
    yield put(
        createSaveCookie({
            name: authTokenCookieName,
            content: token,
            timeToLiveInDays: cookieTTL,
        }),
    );
    yield put(
        createSaveCookie({
            name: shouldRememberAuthTokenCookieName,
            content: shouldRemember.toString(),
            timeToLiveInDays: cookieTTL,
        }),
    );
}
