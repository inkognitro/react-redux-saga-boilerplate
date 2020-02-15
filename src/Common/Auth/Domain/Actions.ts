import {
    API_TOKEN_COOKIE_NAME,
    AuthActions,
    AuthActionTypes,
    AuthState,
    SHOULD_REMEMBER_AUTH_COOKIE_NAME
} from "./Types";
import {ExecutionSummary} from "Common/RequestHandling/Domain/ApiHttpRequestHandling";
import {createReceiveUserDataAction} from "Common/EntityCache/Domain/User/Actions";
import {findApiToken, findApiTokenFromCookie, shouldRememberAuthByCookie} from "Common/Auth/Domain/Selectors";
import {CookieStorageInterface} from "Common/CookieHandling/Domain/CookieStorage";
import {getResponseBodyJson} from "Common/RequestHandling/Domain/HttpRequestHandling/Selectors";
import {getSecondsUntilExpiration} from "Common/Auth/Domain/JWTHandling";
import {apiTokenCookieTimeToLiveInDays, triggerApiTokenRefreshBeforeExpirationInSeconds} from "Common/config";
import {AppThunk} from "Common/types";
import {User} from "Common/EntityCache/Domain/User/UserRepository";
import {AuthenticateOrFailSettings} from "Common/Auth/Domain/AuthManagement";

export function createInitializeCurrentUserThunk(
    getAuthState: () => AuthState,
    cookieStorage: CookieStorageInterface
): AppThunk {
    const apiToken = findApiTokenFromCookie(cookieStorage);
    if (!apiToken) {
        return function (dispatch) {
            dispatch(createReceiveCurrentAuthUserDataAction(null, null));
            dispatch(createStartRefreshTokenIfNeededIntervalThunk(getAuthState));
        }
    }
    return function (dispatch) {
        const isLoaderEnabled = true;
        dispatch(createReceiveCurrentAuthUserDataAction(apiToken, null));
        dispatch(createFetchNewApiTokenThunk(getAuthState, isLoaderEnabled));
        dispatch(createStartRefreshTokenIfNeededIntervalThunk(getAuthState));
    }
}

export function createStartRefreshTokenIfNeededIntervalThunk(getAuthState: () => AuthState): AppThunk {
    return function (dispatch) {
        setInterval(() => {
            const apiToken = findApiToken(getAuthState());
            if (!apiToken) {
                return;
            }
            const isLoaderEnabled = false;
            dispatch(createRefreshApiTokenIfNeededThunk(getAuthState, apiToken, isLoaderEnabled));
        }, 1000);
    };
}

export function createLogoutThunk(cookieStorage: CookieStorageInterface): AppThunk {
    return function (dispatch) {
        cookieStorage.removeCookie(API_TOKEN_COOKIE_NAME);
        cookieStorage.removeCookie(SHOULD_REMEMBER_AUTH_COOKIE_NAME);
        dispatch(createReceiveCurrentAuthUserDataAction(null, null));
    }
}

export function createAuthenticateOrFailThunk(settings: AuthenticateOrFailSettings): AppThunk {
    return function (dispatch) {
        const request = createGetRequest({ //todo: change to POST request!
            url: AUTH_AUTHENTICATE_ENDPOINT,
            queryParameters: { //todo: change to POST request body!
                username: username,
                password: password,
            },
            isLoaderEnabled: true,
        });
        dispatch({type: AuthActionTypes.START_API_TOKEN_FETCH});
        dispatch(executeRequest({
            request: request,
            onSuccess: (summary: ExecutionSummary): void => {
                // @ts-ignore
                const data = getResponseBodyJson(summary).data;
                setAuthUser(data.jwt, data.user, dispatch, shouldRemember);
            },
            onError: (): void => {
                dispatch({type: AuthActionTypes.END_API_TOKEN_FETCH});
            }
        }));
    }
}

export function createRefreshApiTokenIfNeededThunk(
    getAuthState: () => AuthState,
    currentApiToken: string,
    isLoaderEnabled: boolean
): AppThunk {
    return function (dispatch) {
        if (currentApiToken === null) {
            return;
        }
        const secondsUntilJwtExpiration = getSecondsUntilExpiration(currentApiToken);
        if (secondsUntilJwtExpiration > triggerApiTokenRefreshBeforeExpirationInSeconds) {
            return;
        }
        dispatch(createFetchNewApiTokenThunk(getAuthState, isLoaderEnabled));
    };
}

export function createFetchNewApiTokenThunk(getAuthState: () => AuthState, isLoaderEnabled: boolean): AppThunk {
    return function (dispatch) {
        if (getAuthState().isFetchingApiToken) {
            return;
        }
        dispatch({type: AuthActionTypes.START_API_TOKEN_FETCH});
        const request = createGetRequest({
            url: AUTH_REFRESH_TOKEN_ENDPOINT,
            isLoaderEnabled: isLoaderEnabled,
        });
        dispatch(executeRequest({
            request: request,
            onSuccess: (summary: ExecutionSummary): void => {
                // @ts-ignore
                const data = getResponseBodyJson(summary).data;
                dispatch({type: AuthActionTypes.END_API_TOKEN_FETCH});
                setAuthUser(data.jwt, data.user, dispatch);
            },
            onError: (): void => {
                dispatch(createReceiveCurrentAuthUserDataAction(null, null));
                dispatch({type: AuthActionTypes.END_API_TOKEN_FETCH});
            }
        }));
    }
}

export function setAuthUser(cookieStorage: CookieStorageInterface, apiToken: string, user: User, dispatch: Function, shouldRemember?: boolean): void {
    cookieStorage.removeCookie(API_TOKEN_COOKIE_NAME);
    dispatch(createReceiveUserDataAction(user));
    dispatch(createReceiveCurrentAuthUserDataAction(apiToken, user.id));
    if (apiToken) {
        refreshApiTokenCookie(cookieStorage, apiToken, shouldRemember);
    }
}

export function createReceiveCurrentAuthUserDataAction(apiToken: (null | string), userId: (null | string)): AuthActions {
    return {
        type: AuthActionTypes.RECEIVE_CURRENT_AUTH_USER_DATA,
        payload: {
            apiToken: apiToken,
            userId: userId
        }
    };
}

export function refreshApiTokenCookie(cookieStorage: CookieStorageInterface, apiToken: string, newShouldRememberSetting?: boolean): void {
    const shouldRemember = createNewShouldRememberSetting(cookieStorage, newShouldRememberSetting);
    saveShouldRememberCookieSetting(cookieStorage, shouldRemember);
    let settings = {
        name: API_TOKEN_COOKIE_NAME,
        content: apiToken,
    };
    if (shouldRemember) {
        settings = Object.assign({}, settings, {
            timeToLiveInDays: apiTokenCookieTimeToLiveInDays
        });
    }
    cookieStorage.setCookie(settings);
}

export function saveShouldRememberCookieSetting(cookieStorage: CookieStorageInterface, shouldRemember: boolean): void {
    if (shouldRemember) {
        cookieStorage.setCookie({
            name: SHOULD_REMEMBER_AUTH_COOKIE_NAME,
            content: 'true',
            timeToLiveInDays: apiTokenCookieTimeToLiveInDays,
        });
        return;
    }
    cookieStorage.removeCookie(SHOULD_REMEMBER_AUTH_COOKIE_NAME);
}

export function createNewShouldRememberSetting(
    cookieStorage: CookieStorageInterface,
    newShouldRememberSetting?: boolean
): boolean {
    if (newShouldRememberSetting === undefined) {
        return shouldRememberAuthByCookie(cookieStorage);
    }
    return newShouldRememberSetting;
}