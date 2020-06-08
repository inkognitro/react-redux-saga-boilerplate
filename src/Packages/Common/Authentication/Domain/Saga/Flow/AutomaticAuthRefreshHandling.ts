import {
    delay, put, race, select, take,
} from "@redux-saga/core/effects";
import {
    AuthEventTypes,
    authRefreshBeforeExpirationInSeconds,
    AuthState,
    AuthStateSelector,
    AuthUserTypes,
    getCurrentAuthUser,
    UserWasLoggedOut,
} from "Packages/Common/Authentication";
import { getSecondsUntilExpiration } from "../../JWTHandling";
import { createUserAuthenticationWasRefreshed } from "../../Event/UserAuthenticationWasRefreshed";
import { createUserAuthenticationRefreshWasRequested } from "../../Event/UserAuthenticationRefreshWasRequested";

export function* handleAutomaticAuthenticationRefresh(authStateSelector: AuthStateSelector): Generator {
    while (true) {
        yield delay(30000);
        // @ts-ignore
        const authState: AuthState = yield select(authStateSelector);
        const currentAuthUser = getCurrentAuthUser(authState);
        if (currentAuthUser.type !== AuthUserTypes.AUTHENTICATED_USER) {
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
