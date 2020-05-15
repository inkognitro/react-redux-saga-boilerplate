import {
    call, cancelled, put, select,
} from "@redux-saga/core/effects";
import { Login } from "Common/Domain/Authentication/Command/Login";
import {
    authenticate,
    ResponseData,
    ResponseDataTypes,
} from "Common/Domain/RequestHandling/ApiV1/Http/Saga/Auth/Authenticate";
import { createUserLoginFailed } from "Common/Domain/Authentication/Event/UserLoginFailed";
import { AuthState, AuthStateSelector, AuthUser } from "Common/Domain/Authentication/Types";
import { createSaveCookie } from "Common/Domain/Cookie/Command/SaveCookie";
import { createUserWasLoggedIn } from "Common/Domain/Authentication/Event/UserWasLoggedIn";
import { createUserLoginWasCancelled } from "Common/Domain/Authentication/Event/UserLoginWasCancelled";
import {
    authTokenCookieName,
    authTokenCookieTimeToLiveInDays,
} from "Common/Domain/Authentication/Authentication";
import { findCurrentAuthUser } from "Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import { createUserLoginProcessWasNotExecuted } from "Common/Domain/Authentication/Event/UserLoginProcessWasNotExecuted";

export function* handleLogin(authStateSelector: AuthStateSelector, command: Login): Generator {
    // @ts-ignore
    const authState: AuthState = yield select(authStateSelector);
    const currentAuthUser = findCurrentAuthUser(authState);
    if (currentAuthUser) {
        yield put(createUserLoginProcessWasNotExecuted(command.payload));
        return;
    }
    try {
        // @ts-ignore
        const responseData: ResponseData = yield call(authenticate, {
            username: command.payload.username,
            password: command.payload.password,
            isLoaderEnabled: true,
        });
        if (!responseData) {
            yield put(createUserLoginFailed(command.payload));
        }
        if (responseData.type === ResponseDataTypes.SUCCESS) {
            const authUser: AuthUser = {
                token: responseData.token,
                user: responseData.user,
                shouldRemember: command.payload.shouldRemember,
            };
            yield put(
                createSaveCookie({
                    name: authTokenCookieName,
                    content: JSON.stringify(authUser),
                    timeToLiveInDays: command.payload.shouldRemember
                        ? authTokenCookieTimeToLiveInDays
                        : undefined,
                }),
            );
            yield put(createUserWasLoggedIn(command.payload, authUser));
            return;
        }
        if (responseData.type === ResponseDataTypes.ERROR) {
            yield put(createUserLoginFailed(command.payload));
            return;
        }
    } finally {
        if (yield cancelled()) {
            yield put(createUserLoginWasCancelled(command.payload));
        }
    }
}
