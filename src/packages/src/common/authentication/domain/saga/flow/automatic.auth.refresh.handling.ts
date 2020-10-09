import {
    delay, put, race, select, take,
} from "@redux-saga/core/effects";
import { AuthUserTypes } from "packages/common/entity-base/auth-user/domain";
import { AuthenticationRefreshResult, refreshAuthenticationAtEndpoint } from "packages/common/http-api-v1/domain";
import { ResultTypes } from "packages/common/entity-base/common-types";
import { CookieReader } from "packages/common/cookie/domain";
import {
    saveAuthCookies,
    shouldRememberAuthTokenCookieName,
} from "./login.handling";
import { AuthState, AuthStateSelector } from "../../types";
import { getSecondsUntilExpiration } from "../../jwt.handling";
import {
    AuthEventTypes,
    createUserAuthenticationRefreshFailed,
    createUserAuthenticationRefreshWasCancelled,
    createUserAuthenticationRefreshWasRequested,
    createUserAuthenticationWasRefreshed,
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
                refreshResult: refreshAuthenticationAtEndpoint({ token: currentAuthUser.token }),
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
                yield saveAuthCookies(raceResult.refreshResult.data.authUser.token, shouldRemember);
                yield put(createUserAuthenticationWasRefreshed(raceResult.refreshResult.data.authUser, currentAuthUser));
            }
        } finally {
            yield put(createUserAuthenticationRefreshWasCancelled());
        }
    }
}
