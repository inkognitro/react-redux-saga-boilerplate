import {
    call, cancelled, put, select,
} from "@redux-saga/core/effects";
import { authenticate, AuthenticateResult } from "Packages/Common/HttpApiV1";
import { createSaveCookie } from "Packages/Common/Cookie/Domain";
import { ResultTypes } from "Packages/Entity/CommonTypes";
import { AuthUserTypes } from "Packages/Entity/AuthUser/Domain";
import { getCurrentAuthUser } from "../../Query/CurrentAuthUserQuery";
import { AuthState, AuthStateSelector } from "../../Types";
import { Login } from "../../Command/Login";
import { createUserLoginFailed } from "../../Event/UserLoginFailed";
import { createUserWasLoggedIn } from "../../Event/UserWasLoggedIn";
import { createUserLoginWasCancelled } from "../../Event/UserLoginWasCancelled";
import { createUserLoginWasNotExecuted } from "../../Event/UserLoginWasNotExecuted";

export const authTokenCookieTimeToLiveInDays = 14;

export const authTokenCookieName = 'authUser';

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
        const result: AuthenticateResult = yield call(authenticate, {
            username: command.payload.username,
            password: command.payload.password,
        });
        if (result.type === ResultTypes.ERROR) {
            yield put(createUserLoginFailed(command.payload, result));
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
        yield put(createUserWasLoggedIn(command.payload, result));
        return;
    } finally {
        if (yield cancelled()) {
            yield put(createUserLoginWasCancelled(command.payload));
        }
    }
}
