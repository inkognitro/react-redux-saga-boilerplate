import { spawn, takeEvery } from "@redux-saga/core/effects";
import { AuthStateSelector } from "../../Types";
import { handleLogin } from "./LoginHandling";
import { handleLogout } from "./LogoutHandling";
import { handleAutomaticAuthenticationRefresh } from "./AutomaticAuthRefreshHandling";
import { AuthCommandTypes } from "../../Command/Types";

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
