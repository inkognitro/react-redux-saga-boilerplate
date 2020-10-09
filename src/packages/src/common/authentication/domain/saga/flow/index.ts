import { spawn, takeEvery } from "@redux-saga/core/effects";
import { CookieReader } from "packages/common/cookie/domain";
import { handleInitializeCurrentUser } from "./initialize.current.user.handling";
import { AuthStateSelector } from "../../types";
import { handleLogin } from "./login.handling";
import { handleLogout } from "./logout.handling";
import { handleAutomaticAuthenticationRefresh } from "./auth.refresh.handling";
import { AuthCommandTypes } from "../../command";

export function createAuthenticationSaga(cookieReader: CookieReader, authStateSelector: AuthStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(handleAutomaticAuthenticationRefresh, cookieReader, authStateSelector);
        yield spawn(watchLoginCommands, authStateSelector);
        yield spawn(watchLogoutCommands, authStateSelector);
        yield spawn(handleInitializeCurrentUser, cookieReader, authStateSelector);
    };
}

function* watchLoginCommands(authStateSelector: AuthStateSelector): Generator {
    yield takeEvery(AuthCommandTypes.LOGIN, handleLogin, authStateSelector);
}

function* watchLogoutCommands(authStateSelector: AuthStateSelector): Generator {
    yield takeEvery(AuthCommandTypes.LOGOUT, handleLogout, authStateSelector);
}
