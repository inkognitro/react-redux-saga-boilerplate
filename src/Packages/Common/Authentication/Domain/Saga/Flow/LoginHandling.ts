import {
    call, cancelled, put, select,
} from "@redux-saga/core/effects";
import { Login } from "Packages/Common/Authentication/Domain/Command/Login";
import { authenticate, AuthenticateResult } from "Packages/Common/HttpApiV1";
import {
    AuthState,
    AuthStateSelector,
    authTokenCookieName,
    authTokenCookieTimeToLiveInDays,
    findCurrentAuthUser,
} from "Packages/Common/Authentication";
import { createSaveCookie } from "Packages/Common/Cookie";
import { ResultTypes } from "Packages/Common/CommonTypes";
import { createUserLoginFailed } from "../../Event/UserLoginFailed";
import { createUserWasLoggedIn } from "../../Event/UserWasLoggedIn";
import { createUserLoginWasCancelled } from "../../Event/UserLoginWasCancelled";
import { createUserLoginWasNotExecuted } from "../../Event/UserLoginWasNotExecuted";

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
        if (result.type !== ResultTypes.SUCCESS || !result.data.authUser) {
            yield put(createUserLoginFailed(command.payload));
            return;
        }
        yield put(
            createSaveCookie({
                name: authTokenCookieName,
                content: JSON.stringify(result.data.authUser),
                timeToLiveInDays: (command.payload.shouldRemember
                    ? authTokenCookieTimeToLiveInDays
                    : undefined
                ),
            }),
        );
        yield put(createUserWasLoggedIn(command.payload, result.data.authUser));
        return;
    } finally {
        if (yield cancelled()) {
            yield put(createUserLoginWasCancelled(command.payload));
        }
    }
}
