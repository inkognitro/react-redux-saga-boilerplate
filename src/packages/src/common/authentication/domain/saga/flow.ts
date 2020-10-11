import {
    call, cancelled, delay, put, race, select, spawn, fork, cancel, take,
} from "@redux-saga/core/effects";
import { AuthenticatedAuthUser, AuthUser, AuthUserTypes } from "packages/common/types/auth-user/domain";
import {
    AuthenticateResult,
    AuthenticationRefreshResult,
    callAuthenticateEndpoint,
    callRefreshAuthenticationEndpoint,
} from "packages/common/http-api-v1/domain";
import { ResultTypes } from "packages/common/types/util/domain";
import {
    createAuthenticationWasRefreshed,
    createLoginWasCancelled,
    createLoginFailed,
    createUserWasLoggedIn,
    createUserWasLoggedOut,
    createCurrentUserWasInitialized,
    createUserAuthenticationRefreshFailed,
    createCurrentUserCouldNotBeInitialized,
} from "../event";
import { getCurrentAuthUser } from "../query";
import {
    AuthState, AuthStateSelector, CurrentUserStorage, LoginSuccessResult,
} from "../types";
import { AuthCommandTypes, Login } from "../command";
import { getSecondsUntilExpiration } from "../jwt.handling";

const authRefreshIntervalInMs = 30000;
function* executeAuthRefreshInterval(
    authStateSelector: AuthStateSelector,
    currentUserStorage: CurrentUserStorage,
    startImmediately: boolean,
): Generator {
    if (!startImmediately) {
        yield delay(authRefreshIntervalInMs);
    }
    while (true) {
        // @ts-ignore
        const state: AuthState = yield select(authStateSelector);
        const currentUser = getCurrentAuthUser(state);
        if (currentUser.type !== AuthUserTypes.AUTHENTICATED_USER) {
            return;
        }
        if (getSecondsUntilExpiration(currentUser.token) < 0) {
            yield put(createUserAuthenticationRefreshFailed());
            return;
        }
        // @ts-ignore
        const result: AuthenticationRefreshResult = yield callRefreshAuthenticationEndpoint({
            token: currentUser.token,
        });
        if (result.type === ResultTypes.ERROR) {
            yield put(createUserAuthenticationRefreshFailed());
            return;
        }
        const newCurrentUser: AuthUser = {
            ...currentUser,
            token: result.data.token,
            user: result.data.user,
        };
        currentUserStorage.save(newCurrentUser);
        yield put(createAuthenticationWasRefreshed(newCurrentUser, currentUser));
        yield delay(authRefreshIntervalInMs);
    }
}

function* watchLogin(currentUserStorage: CurrentUserStorage): Generator {
    // @ts-ignore
    const command: Login = yield take(AuthCommandTypes.LOGIN);
    try {
        // @ts-ignore
        const result: AuthenticateResult = yield callAuthenticateEndpoint({
            username: command.payload.settings.username,
            password: command.payload.settings.password,
        });
        if (result.type === ResultTypes.ERROR) {
            yield put(createLoginFailed(result, command.payload.taskId));
            return false;
        }
        const authUser: AuthenticatedAuthUser = {
            type: AuthUserTypes.AUTHENTICATED_USER,
            token: result.data.token,
            user: result.data.user,
            shouldRemember: command.payload.settings.shouldRemember,
        };
        currentUserStorage.save(authUser);
        const successResult: LoginSuccessResult = { ...result, data: { authUser } };
        yield put(createUserWasLoggedIn(successResult, command.payload.taskId));
        return true;
    } finally {
        if (yield cancelled()) {
            yield put(createLoginWasCancelled(command.payload.taskId));
        }
    }
}

function* watchLogout(authStateSelector: AuthStateSelector, currentUserStorage: CurrentUserStorage): Generator {
    yield take(AuthCommandTypes.LOGOUT);
    // @ts-ignore
    const state: AuthState = yield select(authStateSelector);
    const currentUser = getCurrentAuthUser(state);
    if (currentUser.type !== AuthUserTypes.AUTHENTICATED_USER) {
        return;
    }
    currentUserStorage.remove();
    yield put(createUserWasLoggedOut(currentUser));
}

function* initializeCurrentUser(currentUserStorage: CurrentUserStorage): Generator {
    const currentUser = currentUserStorage.find();
    if (!currentUser) {
        yield put(createCurrentUserCouldNotBeInitialized());
        return;
    }
    yield put(createCurrentUserWasInitialized(currentUser));
}

function* authenticationFlow(
    authStateSelector: AuthStateSelector,
    currentUserStorage: CurrentUserStorage,
): Generator {
    yield call(initializeCurrentUser, currentUserStorage);
    let startImmediately = true;
    while (true) {
        const refreshTask = yield fork(
            executeAuthRefreshInterval,
            authStateSelector,
            currentUserStorage,
            startImmediately,
        );
        yield race({
            loginTask: call(watchLogin, currentUserStorage),
            logoutTask: call(watchLogout, authStateSelector, currentUserStorage),
        });
        // @ts-ignore
        cancel(refreshTask);
        startImmediately = false;
    }
}

export function createAuthenticationSaga(
    authStateSelector: AuthStateSelector,
    currentUserStorage: CurrentUserStorage,
): () => Generator {
    return function* (): Generator {
        yield spawn(authenticationFlow, authStateSelector, currentUserStorage);
    };
}
