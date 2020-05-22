import { spawn, takeEvery } from "redux-saga/effects";
import { AuthCommandTypes, AuthStateSelector } from "Packages/Common/Authentication/Domain/Types";
import { handleLogin } from "Packages/Common/Authentication/Domain/Saga/Flows/LoginHandling";
import {
    handleAutomaticAuthenticationRefresh,
} from "Packages/Common/Authentication/Domain/Saga/Flows/AutomaticAuthRefreshHandling";
import { handleLogout } from "Packages/Common/Authentication/Domain/Saga/Flows/LogoutHandling";

export const authTokenCookieName = 'authUser';
export const authTokenCookieTimeToLiveInDays = 14;
export const authRefreshBeforeExpirationInSeconds = 60;

export function createAuthenticationSaga(authStateSelector: AuthStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(handleAutomaticAuthenticationRefresh, authStateSelector);
        yield spawn(watchLoginCommands, authStateSelector);
        yield spawn(watchLogoutCommands, authStateSelector);
    };
}

function* watchLoginCommands(authStateSelector: AuthStateSelector): Generator {
    yield takeEvery(AuthCommandTypes.LOGIN, handleLogin, authStateSelector);
}

function* watchLogoutCommands(authStateSelector: AuthStateSelector): Generator {
    yield takeEvery(AuthCommandTypes.LOGOUT, handleLogout, authStateSelector);
}
