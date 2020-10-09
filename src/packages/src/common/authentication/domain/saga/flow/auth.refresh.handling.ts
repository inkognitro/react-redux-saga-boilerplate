import {
    delay, put, race, select, take,
} from "redux-saga/effects";
import { AuthUser, AuthUserTypes } from "packages/common/types/auth-user/domain";
import { AuthenticationRefreshResult, callRefreshAuthenticationEndpoint } from "packages/common/http-api-v1/domain";
import { ResultTypes } from "packages/common/types/util/domain";
import { CookieReader } from "packages/common/cookie/domain";
import { saveAuthCookies, shouldRememberAuthTokenCookieName } from "./login.handling";
import { AuthState, AuthStateSelector } from "../../types";
import { getSecondsUntilExpiration } from "../../jwt.handling";
import {
    AuthEventTypes,
    createUserAuthenticationRefreshFailed,
    createUserAuthenticationRefreshWasCancelled,
    createUserAuthenticationRefreshWasRequested,
    createAuthenticationWasRefreshed,
    UserWasLoggedOut,
} from "../../event";
import { getCurrentAuthUser } from "../../query";

const authRefreshBeforeExpirationInSeconds = 60;
const authRefreshIntervalInSeconds = 30;

export function* handleAutomaticAuthenticationRefresh(
    cookieReader: CookieReader,
    authStateSelector: AuthStateSelector,
): Generator {
    while (true) {
        yield delay(authRefreshIntervalInSeconds * 1000);
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
        put(createUserAuthenticationRefreshWasRequested(currentAuthUser));
        try {
            // @ts-ignore
            const raceResult: { logoutEvent?: UserWasLoggedOut, refreshResult?: AuthenticationRefreshResult } = yield race({
                refreshResult: callRefreshAuthenticationEndpoint({token: currentAuthUser.token}),
                logoutEvent: take(AuthEventTypes.USER_WAS_LOGGED_OUT),
            });
            if (raceResult.logoutEvent) {
                yield put(createUserAuthenticationRefreshWasCancelled());
            }
            if (raceResult.refreshResult && raceResult.refreshResult.type === ResultTypes.ERROR) {
                yield put(createUserAuthenticationRefreshFailed());
            }
            if (raceResult.refreshResult && raceResult.refreshResult.type === ResultTypes.SUCCESS) {
                const shouldRememberCookieContent = cookieReader.findCookieContent(shouldRememberAuthTokenCookieName);
                const shouldRemember: boolean = (
                    shouldRememberCookieContent !== null
                    && shouldRememberCookieContent.length !== 0
                );
                const authUser: AuthUser = {
                    type: AuthUserTypes.AUTHENTICATED_USER,
                    token: raceResult.refreshResult.data.token,
                    user: raceResult.refreshResult.data.user,
                };
                yield saveAuthCookies(authUser.token, shouldRemember);
                yield put(createAuthenticationWasRefreshed(authUser, currentAuthUser));
            }
        } finally {
            yield put(createUserAuthenticationRefreshWasCancelled());
        }
    }
}
