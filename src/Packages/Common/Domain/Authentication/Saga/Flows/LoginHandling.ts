import {
    call, cancelled, put, select,
} from "@redux-saga/core/effects";
import { Login } from "Packages/Common/Domain/Authentication/Command/Login";
import {
    authenticate,
    AuthenticateResult,
} from "Packages/Common/Domain/HttpApiV1/Saga/Callables/Authenticate";
import { createUserLoginFailed } from "Packages/Common/Domain/Authentication/Event/UserLoginFailed";
import { AuthState, AuthStateSelector } from "Packages/Common/Domain/Authentication/Types";
import { createSaveCookie } from "Packages/Common/Domain/Cookie/Command/SaveCookie";
import { createUserWasLoggedIn } from "Packages/Common/Domain/Authentication/Event/UserWasLoggedIn";
import { createUserLoginWasCancelled } from "Packages/Common/Domain/Authentication/Event/UserLoginWasCancelled";
import {
    authTokenCookieName,
    authTokenCookieTimeToLiveInDays,
} from "Packages/Common/Domain/Authentication/Authentication";
import { findCurrentAuthUser } from "Packages/Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import { createUserLoginWasNotExecuted } from "Packages/Common/Domain/Authentication/Event/UserLoginWasNotExecuted";

export function* handleLogin(authStateSelector: AuthStateSelector, command: Login): Generator {
    // @ts-ignore
    const authState: AuthState = yield select(authStateSelector);
    const currentAuthUser = findCurrentAuthUser(authState);
    if (currentAuthUser) {
        yield put(createUserLoginWasNotExecuted(command.payload));
        return;
    }
    try {
        // @ts-ignore
        const result: AuthenticateResult = yield call(authenticate, {
            username: command.payload.username,
            password: command.payload.password,
        });
        if (result.successData) {
            yield put(
                createSaveCookie({
                    name: authTokenCookieName,
                    content: JSON.stringify(result.successData.authUser),
                    timeToLiveInDays: (command.payload.shouldRemember
                        ? authTokenCookieTimeToLiveInDays
                        : undefined
                    ),
                }),
            );
            yield put(createUserWasLoggedIn(command.payload, result.successData.authUser));
            return;
        }
        if (result.errorData) {
            yield put(createUserLoginFailed(command.payload));
            return;
        }
        yield put(createUserLoginFailed(command.payload));
    } finally {
        if (yield cancelled()) {
            yield put(createUserLoginWasCancelled(command.payload));
        }
    }
}
