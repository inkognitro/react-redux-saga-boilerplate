import { AuthState, AuthStateSelector } from "Common/Domain/Authentication/Types";
import { delay, select } from "@redux-saga/core/effects";
import { findCurrentAuthUser } from "Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import { getSecondsUntilExpiration } from "Common/Domain/Authentication/JWTHandling";
import { authRefreshBeforeExpirationInSeconds } from "Common/Domain/Authentication/Authentication";

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
        if (secondsUntilExpiration < authRefreshBeforeExpirationInSeconds) {
            console.log('execute token refresh');
        }
    }
}
