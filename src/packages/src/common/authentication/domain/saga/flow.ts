import {cancel, cancelled, fork, put, select, spawn, take, call, race } from "@redux-saga/core/effects";
import {Task} from "@redux-saga/types";
import {AuthUser, AuthUserTypes} from "packages/common/types/auth-user/domain";
import {
    createLoginWasCancelled,
    createUserLoginFailed,
    createUserWasLoggedIn,
    createUserWasLoggedOut,
} from "packages/common/authentication/domain/event";
import {
    AuthenticateResult,
    AuthenticationRefreshResult,
    callAuthenticateEndpoint, callRefreshAuthenticationEndpoint
} from "packages/common/http-api-v1/domain";
import {ResultTypes} from "packages/common/types/util/domain";
import {AuthState, AuthStateSelector, CurrentUserStorage} from "../types";
import {AuthCommandTypes, Login, Logout, RefreshAuthentication,} from "../command";
import {getCurrentAuthUser} from "packages/common/authentication/domain";

export function createAuthenticationSaga(
    authStateSelector: AuthStateSelector,
    currentUserStorage: CurrentUserStorage,
): () => Generator {
    return function* (): Generator {
        yield spawn(authenticationFlow, authStateSelector, currentUserStorage);
    };
}

type AuthCommand = (Login | Logout);

function* authenticationFlow(
    authStateSelector: AuthStateSelector,
    currentUserStorage: CurrentUserStorage,
): Generator {
    while (true) {
        // @ts-ignore
        const command: AuthCommand = take([
            AuthCommandTypes.LOGIN,
            AuthCommandTypes.LOGOUT,
        ]);
        yield race({
            task: call(handleLogin, authStateSelector, currentUserStorage, command), // todo: clean up!
            logout: take(AuthCommandTypes.LOGOUT), // todo: clean up!
        });
    }
}

function* handleLogin(
    authStateSelector: AuthStateSelector,
    currentUserStorage: CurrentUserStorage,
    command: Login,
): Generator {
    try {
        // @ts-ignore
        const result: AuthenticateResult = yield callAuthenticateEndpoint({
            username: command.payload.username,
            password: command.payload.password,
        });
        if (result.type === ResultTypes.ERROR) {
            yield put(createUserLoginFailed(result));
            return;
        }
        const authUser: AuthUser = {
            type: AuthUserTypes.AUTHENTICATED_USER,
            token: result.data.token,
            user: result.data.user,
            shouldRemember: command.payload.shouldRemember,
        };
        currentUserStorage.saveCurrentUser(authUser);
        yield put(createUserWasLoggedIn(authUser));
        yield fork(executeAuthRefreshInterval, authStateSelector, currentUserStorage);
        return;
    } finally {
        if (yield cancelled()) {
            yield put(createLoginWasCancelled());
        }
    }
}

function* executeAuthRefreshInterval(
    authStateSelector: AuthStateSelector,
    currentUserStorage: CurrentUserStorage,
): Generator {
    while (true) {
        // @ts-ignore
        const state: AuthState = yield select(authStateSelector);
        const currentUser = getCurrentAuthUser(state);
        if (currentUser.type !== AuthUserTypes.AUTHENTICATED_USER) {
            return;
        }
        // @ts-ignore
        const result: AuthenticationRefreshResult = yield callRefreshAuthenticationEndpoint({
            token: currentUser.token,
        });
        if (result.type === ResultTypes.ERROR) {
            yield put(createUserLoginFailed(result));
            return;
        }
        const newCurrentUser: AuthUser = {
            ...currentUser,
            token: result.data.token,
            user: result.data.user,
        };
        currentUserStorage.saveCurrentUser(newCurrentUser);
        yield put(createUserWasLoggedIn(newCurrentUser));
    }
}

function* handleLogout(authStateSelector: AuthStateSelector, currentUserStorage: CurrentUserStorage): Generator {
    // @ts-ignore
    const state: AuthState = yield select(authStateSelector);
    const currentUser = getCurrentAuthUser(state);
    if (currentUser.type !== AuthUserTypes.AUTHENTICATED_USER) {
        return;
    }
    currentUserStorage.removeCurrentUser();
    yield put(createUserWasLoggedOut(currentUser));
}
