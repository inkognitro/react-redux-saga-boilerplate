import { spawn, takeEvery } from "@redux-saga/core/effects";
import { AuthStateSelector } from "../../types";
import { handleLogin } from "./login.handling";
import { handleLogout } from "./logout.handling";
import { handleAutomaticAuthenticationRefresh } from "./automatic.auth.refresh.handling";
import { AuthCommandTypes } from "../../command";

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
