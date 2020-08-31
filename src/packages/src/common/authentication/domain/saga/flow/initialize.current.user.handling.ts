import {
    call, cancelled, put, select,
} from "@redux-saga/core/effects";
import { refreshAuthenticationAtEndpoint, AuthenticationRefreshResult } from "packages/common/http-api-v1/domain";
import { CookieReader } from "packages/common/cookie/domain";
import { ResultTypes } from "packages/entity/common-types";
import { AuthUserTypes } from "packages/entity/auth-user/domain";
import { AuthState, AuthStateSelector } from "../../types";
import {
    createCurrentUserInitializationWasCancelled,
    createCurrentUserInitializationWasStarted,
    createCurrentUserWasInitialized,
} from "../../event";
import { getCurrentAuthUser } from "../../query";
import {
    authTokenCookieName,
    saveAuthCookies,
    shouldRememberAuthTokenCookieName,
} from "./login.handling";

export function* handleInitializeCurrentUser(
    cookieReader: CookieReader,
    authStateSelector: AuthStateSelector,
): Generator {
    // @ts-ignore
    const authState: AuthState = yield select(authStateSelector);
    const currentAuthUser = getCurrentAuthUser(authState);
    if (currentAuthUser.type === AuthUserTypes.AUTHENTICATED_USER) {
        return;
    }
    const token = cookieReader.findCookieContent(authTokenCookieName);
    if (token === null) {
        return;
    }
    yield put(createCurrentUserInitializationWasStarted());
    try {
        // @ts-ignore
        const result: AuthenticationRefreshResult = yield call(refreshAuthenticationAtEndpoint, { token });
        if (result.type === ResultTypes.ERROR) {
            return;
        }
        const shouldRememberCookieContent = cookieReader.findCookieContent(shouldRememberAuthTokenCookieName);
        const shouldRemember: boolean = (
            shouldRememberCookieContent !== null
            && shouldRememberCookieContent.length !== 0
        );
        yield saveAuthCookies(result.data.authUser.token, shouldRemember);
        yield put(createCurrentUserWasInitialized(result.data.authUser));
    } finally {
        if (yield cancelled()) {
            yield put(createCurrentUserInitializationWasCancelled());
        }
    }
}
