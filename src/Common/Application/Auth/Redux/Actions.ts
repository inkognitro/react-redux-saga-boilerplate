import {
    API_TOKEN_COOKIE_NAME,
    AuthActions,
    AuthActionTypes,
    AuthState,
    SHOULD_REMEMBER_AUTH_COOKIE_NAME
} from "./Types";
import {
    AUTH_AUTHENTICATE_ENDPOINT,
    AUTH_REFRESH_TOKEN_ENDPOINT,
    createGetRequest,
    executeRequest,
    ExecutionSummary
} from "Common/Utility/ApiHttpRequestHandling";
import {receiveUserData} from "Common/Application/EntityCache/Redux/UserRepository/Actions";
import {findApiToken, findApiTokenFromCookie, shouldRememberAuthByCookie} from "Common/Application/Auth/Redux/Selectors";
import {removeCookie, setCookie} from "Common/Application/CookieHandling";
import {User} from "Common/Application/EntityCache/Redux/UserRepository/Types";
import {getResponseBodyJson} from "Common/Application/RequestHandling/Redux/Selectors";
import {getSecondsUntilExpiration} from "Common/Application/Auth/JWT";
import {apiTokenCookieTimeToLiveInDays, triggerApiTokenRefreshBeforeExpirationInSeconds} from "Common/config";
import {AppThunk} from "Common/types";

export function initializeAuth(getAuthState: () => AuthState): AppThunk {
    const apiToken = findApiTokenFromCookie();
    if (!apiToken) {
        return function (dispatch) {
            dispatch(receiveCurrentAuthUserData(null, null));
            dispatch(setRefreshTokenInterval(getAuthState));
        }
    }
    return function (dispatch) {
        const isLoaderEnabled = true;
        dispatch(receiveCurrentAuthUserData(apiToken, null));
        dispatch(fetchNewApiToken(getAuthState, isLoaderEnabled));
        dispatch(setRefreshTokenInterval(getAuthState));
    }
}

function setRefreshTokenInterval(getAuthState: () => AuthState): AppThunk {
    return function (dispatch) {
        setInterval(() => {
            const apiToken = findApiToken(getAuthState());
            if (!apiToken) {
                return;
            }
            const isLoaderEnabled = false;
            dispatch(refreshApiTokenIfNeeded(getAuthState, apiToken, isLoaderEnabled));
        }, 1000);
    };
}

export function logout(): AppThunk {
    return function (dispatch) {
        removeCookie(API_TOKEN_COOKIE_NAME);
        removeCookie(SHOULD_REMEMBER_AUTH_COOKIE_NAME);
        dispatch(receiveCurrentAuthUserData(null, null));
    }
}

export function authenticate(username: string, password: string, shouldRemember: boolean): AppThunk {
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

function refreshApiTokenIfNeeded(getAuthState: () => AuthState, currentApiToken: string, isLoaderEnabled: boolean): AppThunk {
    return function (dispatch) {
        if (currentApiToken === null) {
            return;
        }
        const secondsUntilJwtExpiration = getSecondsUntilExpiration(currentApiToken);
        if (secondsUntilJwtExpiration > triggerApiTokenRefreshBeforeExpirationInSeconds) {
            return;
        }
        dispatch(fetchNewApiToken(getAuthState, isLoaderEnabled));
    };
}

function fetchNewApiToken(getAuthState: () => AuthState, isLoaderEnabled: boolean): AppThunk {
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
                dispatch(receiveCurrentAuthUserData(null, null));
                dispatch({type: AuthActionTypes.END_API_TOKEN_FETCH});
            }
        }));
    }
}

function setAuthUser(apiToken: string, user: User, dispatch: Function, shouldRemember?: boolean): void {
    removeCookie(API_TOKEN_COOKIE_NAME);
    dispatch(receiveUserData(user));
    dispatch(receiveCurrentAuthUserData(apiToken, user.id));
    if (apiToken) {
        refreshApiTokenCookie(apiToken, shouldRemember);
    }
}

function receiveCurrentAuthUserData(apiToken: (null | string), userId: (null | string)): AuthActions {
    return {
        type: AuthActionTypes.RECEIVE_CURRENT_AUTH_USER_DATA,
        payload: {
            apiToken: apiToken,
            userId: userId
        }
    };
}

function refreshApiTokenCookie(apiToken: string, newShouldRememberSetting?: boolean): void {
    const shouldRemember = createNewShouldRememberSetting(newShouldRememberSetting);
    saveShouldRememberCookieSetting(shouldRemember);
    let settings = {
        name: API_TOKEN_COOKIE_NAME,
        content: apiToken,
    };
    if (shouldRemember) {
        settings = Object.assign({}, settings, {
            timeToLiveInDays: apiTokenCookieTimeToLiveInDays
        });
    }
    setCookie(settings);
}

function saveShouldRememberCookieSetting(shouldRemember: boolean): void {
    if(shouldRemember) {
        setCookie({
            name: SHOULD_REMEMBER_AUTH_COOKIE_NAME,
            content: 'true',
            timeToLiveInDays: apiTokenCookieTimeToLiveInDays,
        });
        return;
    }
    removeCookie(SHOULD_REMEMBER_AUTH_COOKIE_NAME);
}

function createNewShouldRememberSetting(newShouldRememberSetting?: boolean): boolean {
    if(newShouldRememberSetting === undefined) {
        return shouldRememberAuthByCookie();
    }
    return newShouldRememberSetting;
}