import { put, select } from "@redux-saga/core/effects";
import { AuthState, AuthStateSelector } from "Common/Domain/Authentication/Types";
import { findCurrentAuthUser } from "Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import { Logout } from "Common/Domain/Authentication/Command/Logout";
import { createUserLogoutWasNotExecuted } from "Common/Domain/Authentication/Event/UserLogoutWasNotExecuted";
import { createUserWasLoggedOut } from "Common/Domain/Authentication/Event/UserWasLoggedOut";

export function* handleLogout(authStateSelector: AuthStateSelector, command: Logout): Generator {
    // @ts-ignore
    const authState: AuthState = yield select(authStateSelector);
    const currentAuthUser = findCurrentAuthUser(authState);
    if (!currentAuthUser) {
        yield put(createUserLogoutWasNotExecuted(command.payload.logoutId));
        return;
    }
    yield put(createUserWasLoggedOut(currentAuthUser));
}
