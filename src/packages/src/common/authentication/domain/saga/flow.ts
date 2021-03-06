import { call, cancelled, delay, put, race, select, spawn, take } from 'redux-saga/effects';
import { AuthenticatedAuthUser, AuthUser, AuthUserTypes } from 'packages/common/types/auth-user/domain';
import {
    AuthenticateResult,
    AuthenticationRefreshResult,
    callAuthenticateEndpoint,
    callRefreshAuthenticationEndpoint,
} from 'packages/common/http-api-v1/domain';
import { ResultTypes } from 'packages/common/types/util/domain';
import {
    createAuthenticationWasRefreshed,
    createLoginWasCancelled,
    createLoginFailed,
    createUserWasLoggedIn,
    createUserWasLoggedOut,
    createCurrentUserWasInitialized,
    createUserAuthenticationRefreshFailed,
    createCurrentUserCouldNotBeInitialized,
} from '../event';
import { getCurrentAuthUser } from '../query';
import { AuthState, AuthStateSelector, CurrentUserStorage, LoginSuccessResult } from '../types';
import { AuthCommandTypes, Login } from '../command';
import { findSecondsUntilExpiration } from '../jwt.handling';

const checkForAuthRefreshEveryMs = 60000;
const maxDifferenceBetweenRefreshToExpirationInMs = 10000;
function* executeAuthRefreshInterval(
    authStateSelector: AuthStateSelector,
    currentUserStorage: CurrentUserStorage,
    startImmediately: boolean
): Generator {
    if (!startImmediately) {
        yield delay(checkForAuthRefreshEveryMs);
    }
    while (true) {
        // @ts-ignore
        const state: AuthState = yield select(authStateSelector);
        const currentUser = getCurrentAuthUser(state);
        if (currentUser.type !== AuthUserTypes.AUTHENTICATED_USER) {
            return;
        }
        const secondsUntilExpiration = findSecondsUntilExpiration(currentUser.token);
        if (secondsUntilExpiration !== null && secondsUntilExpiration <= 0) {
            yield put(createUserAuthenticationRefreshFailed());
            currentUserStorage.remove();
            return;
        }
        const maxDelayUntilRefresh = (checkForAuthRefreshEveryMs + maxDifferenceBetweenRefreshToExpirationInMs) / 1000;
        if (secondsUntilExpiration !== null && secondsUntilExpiration > maxDelayUntilRefresh) {
            yield delay(checkForAuthRefreshEveryMs);
            continue;
        }
        // @ts-ignore
        const result: AuthenticationRefreshResult = yield callRefreshAuthenticationEndpoint({
            token: currentUser.token,
        });
        if (result.type === ResultTypes.ERROR) {
            yield put(createUserAuthenticationRefreshFailed());
            currentUserStorage.remove();
            return;
        }
        const newCurrentUser: AuthUser = {
            ...currentUser,
            token: result.data.token,
            user: result.data.user,
        };
        currentUserStorage.save(newCurrentUser);
        yield put(createAuthenticationWasRefreshed(newCurrentUser, currentUser));
        yield delay(checkForAuthRefreshEveryMs);
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
        const successResult: LoginSuccessResult = {
            ...result,
            data: { authUser },
        };
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

function* authenticationFlow(authStateSelector: AuthStateSelector, currentUserStorage: CurrentUserStorage): Generator {
    yield call(initializeCurrentUser, currentUserStorage);
    let startImmediately = true;
    while (true) {
        yield race({
            refreshTask: call(executeAuthRefreshInterval, authStateSelector, currentUserStorage, startImmediately),
            loginTask: call(watchLogin, currentUserStorage),
            logoutTask: call(watchLogout, authStateSelector, currentUserStorage),
        });
        startImmediately = false;
    }
}

export function createAuthenticationSaga(
    authStateSelector: AuthStateSelector,
    currentUserStorage: CurrentUserStorage
): () => Generator {
    return function* (): Generator {
        yield spawn(authenticationFlow, authStateSelector, currentUserStorage);
    };
}
