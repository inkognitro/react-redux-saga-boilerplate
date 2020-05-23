import {
    AuthEventTypes,
    AuthState,
    AuthStateSelector,
} from "Packages/Common/Authentication/Domain/Types";
import {
    delay, select, take, race, put,
} from "@redux-saga/core/effects";
import { findCurrentAuthUser } from "Packages/Common/Authentication/Domain/Query/CurrentAuthUserQuery";
import { getSecondsUntilExpiration } from "Packages/Common/Authentication/Domain/JWTHandling";
import { UserWasLoggedOut } from "Packages/Common/Authentication/Domain/Event/UserWasLoggedOut";
import { createUserAuthenticationWasRefreshed } from "Packages/Common/Authentication/Domain/Event/UserAuthenticationWasRefreshed";
import {
    createUserAuthenticationRefreshWasRequested,
} from "Packages/Common/Authentication/Domain/Event/UserAuthenticationRefreshWasRequested";
import {authRefreshBeforeExpirationInSeconds} from "Packages/Common/Authentication";

export function* handleAutomaticAuthenticationRefresh(authStateSelector: AuthStateSelector): Generator {
    while (true) {
        yield delay(30000);
        // @ts-ignore
        const authState: AuthState = yield select(authStateSelector);
        const currentAuthUser = findCurrentAuthUser(authState);
        if (!currentAuthUser) {
            continue;
        }
        const secondsUntilExpiration = getSecondsUntilExpiration(currentAuthUser.token);
        if (secondsUntilExpiration > authRefreshBeforeExpirationInSeconds) {
            continue;
        }
        // todo: execute automatic token refresh
        put(createUserAuthenticationRefreshWasRequested(currentAuthUser));
        // @ts-ignore
        const raceResult: {logoutEvent?: UserWasLoggedOut} = yield race({
            // todo: insert refresh auth api call here (with dispatched events)
            logoutEvent: take(AuthEventTypes.USER_WAS_LOGGED_OUT),
        });
        if (raceResult.logoutEvent) {
            return;
        }
        // todo: replace first param with new authUser from api call
        put(createUserAuthenticationWasRefreshed(currentAuthUser, currentAuthUser));
    }
}
