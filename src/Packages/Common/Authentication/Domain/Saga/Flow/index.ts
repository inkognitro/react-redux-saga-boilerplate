import { AuthCommandTypes, AuthStateSelector } from "Packages/Common/Authentication/Domain/Types";
import { spawn, takeEvery } from "@redux-saga/core/effects";
import { handleLogin } from "Packages/Common/Authentication/Domain/Saga/Flow/LoginHandling";
import { handleLogout } from "Packages/Common/Authentication/Domain/Saga/Flow/LogoutHandling";
import {
    handleAutomaticAuthenticationRefresh,
} from "Packages/Common/Authentication/Domain/Saga/Flow/AutomaticAuthRefreshHandling";

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
