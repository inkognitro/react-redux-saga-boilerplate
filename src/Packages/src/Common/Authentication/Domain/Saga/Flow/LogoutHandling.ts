import { put, select } from "@redux-saga/core/effects";
import {
    AuthState, AuthStateSelector, AuthUserTypes, getCurrentAuthUser, Logout,
} from "Packages/Common/Authentication";
import { createUserLogoutWasNotExecuted } from "../../Event/UserLogoutWasNotExecuted";
import { createUserWasLoggedOut } from "../../Event/UserWasLoggedOut";

export function* handleLogout(authStateSelector: AuthStateSelector, command: Logout): Generator {
    // @ts-ignore
    const authState: AuthState = yield select(authStateSelector);
    const currentAuthUser = getCurrentAuthUser(authState);
    if (currentAuthUser.type !== AuthUserTypes.AUTHENTICATED_USER) {
        yield put(createUserLogoutWasNotExecuted(command.payload.logoutId));
        return;
    }
    yield put(createUserWasLoggedOut({
        authUser: currentAuthUser,
        logoutId: command.payload.logoutId,
    }));
}
