import {
    cancel,
    fork,
    put,
    select,
    take,
} from "redux-saga/effects";
import {
    AuthCommandTypes,
    AuthEventTypes,
    AuthState,
    AuthStateSelector,
} from "Common/Domain/Authentication/Types";
import { Login } from "Common/Domain/Authentication/Command/Login";
import { Action } from "redux";
import { findCurrentAuthUser } from "Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import { createUserWasLoggedOut } from "Common/Domain/Authentication/Event/UserWasLoggedOut";
import { handleLogin } from "Common/Domain/Authentication/Saga/LoginHandling";

export const authTokenCookieName = "authUser";
export const authTokenCookieTimeToLiveInDays = 14;
// const authRefreshBeforeExpirationInSeconds = 60; //todo use for authentication refresh!

export function createAuthenticationSaga(
    authStateSelector: AuthStateSelector,
): () => Generator {
    return function* (): Generator {
        while (true) {
            // @ts-ignore
            const command: Login = yield take([AuthCommandTypes.LOGIN]);
            const loginTask = yield fork(handleLogin, command);
            // @ts-ignore
            const action: Action = yield take([
                AuthEventTypes.USER_LOGIN_FAILED,
                AuthCommandTypes.LOGOUT,
            ]);
            if (action.type === AuthEventTypes.USER_LOGIN_FAILED) {
                continue;
            }
            if (action.type === AuthCommandTypes.LOGOUT) {
                // @ts-ignore
                yield cancel(loginTask);
                // @ts-ignore
                const authState: AuthState = yield select(authStateSelector);
                const authUser = findCurrentAuthUser(authState);
                if (!authUser) {
                    continue;
                }
                yield put(createUserWasLoggedOut());
            }
        }
    };
}
