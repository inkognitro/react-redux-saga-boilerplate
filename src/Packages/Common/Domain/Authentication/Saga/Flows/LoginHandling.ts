import {
    call, cancelled, put, select,
} from "@redux-saga/core/effects";
import { Login } from "Packages/Common/Domain/Authentication/Command/Login";
import {
    authenticate,
    Result,
    ResponseDataTypes,
} from "Packages/Common/Domain/HttpApiV1/Saga/Auth/Authenticate";
import { createUserLoginFailed } from "Packages/Common/Domain/Authentication/Event/UserLoginFailed";
import { AuthState, AuthStateSelector, AuthUser } from "Packages/Common/Domain/Authentication/Types";
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
        const result: Result = yield call(authenticate, {
            username: command.payload.username,
            password: command.payload.password,
        });
        if (result.successData) {
            const authUser: AuthUser = {
                token: result.successData.token,
                user: result.successData.user,
                shouldRemember: command.payload.shouldRemember,
            };
            yield put(
                createSaveCookie({
                    name: authTokenCookieName,
                    content: JSON.stringify(authUser),
                    timeToLiveInDays: (command.payload.shouldRemember
                        ? authTokenCookieTimeToLiveInDays
                        : undefined
                    ),
                }),
            );
            yield put(createUserWasLoggedIn(command.payload, authUser));
            return;
        }
        if (result.errorData === ResponseDataTypes.ERROR) {
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
