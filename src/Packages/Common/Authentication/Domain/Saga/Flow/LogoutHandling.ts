import { put, select } from "@redux-saga/core/effects";
import {
    AuthState, AuthStateSelector, findCurrentAuthUser, Logout,
} from "Packages/Common/Authentication";
import { createUserLogoutWasNotExecuted } from "../../Event/UserLogoutWasNotExecuted";
import { createUserWasLoggedOut } from "../../Event/UserWasLoggedOut";

export function* handleLogout(authStateSelector: AuthStateSelector, command: Logout): Generator {
    // @ts-ignore
    const authState: AuthState = yield select(authStateSelector);
    const currentAuthUser = findCurrentAuthUser(authState);
    if (!currentAuthUser) {
        yield put(createUserLogoutWasNotExecuted(command.payload.logoutId));
        return;
    }
    yield put(createUserWasLoggedOut({
        authUser: currentAuthUser,
        logoutId: command.payload.logoutId,
    }));
}
