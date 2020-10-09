import { put, select } from "@redux-saga/core/effects";
import { AuthUserTypes } from "packages/common/types/auth-user/domain";
import { createRemoveCookie } from "packages/common/cookie/domain";
import { AuthState, AuthStateSelector } from "../../types";
import { Logout } from "../../command";
import { createUserLogoutWasNotExecuted, createUserWasLoggedOut } from "../../event";
import { getCurrentAuthUser } from "../../query";
import { authTokenCookieName, shouldRememberAuthTokenCookieName } from "./login.handling";

export function* handleLogout(authStateSelector: AuthStateSelector, command: Logout): Generator {
    // @ts-ignore
    const authState: AuthState = yield select(authStateSelector);
    const currentAuthUser = getCurrentAuthUser(authState);
    if (currentAuthUser.type !== AuthUserTypes.AUTHENTICATED_USER) {
        yield put(createUserLogoutWasNotExecuted(command.payload.logoutId));
        return;
    }
    yield put(createRemoveCookie(authTokenCookieName));
    yield put(createRemoveCookie(shouldRememberAuthTokenCookieName));
    yield put(createUserWasLoggedOut({
        authUser: currentAuthUser,
        logoutId: command.payload.logoutId,
    }));
}
