import {API_TOKEN_COOKIE_NAME, AuthActions, AuthActionTypes, AuthState} from "./Types";
import {
    API_TOKEN_HEADER_NAME, AUTH_AUTHENTICATE_ENDPOINT,
    AUTH_REFRESH_TOKEN_ENDPOINT,
    createGetRequest,
    executeRequest,
    ExecutionSummary
} from "SinglePageApp/Utility/ApiHttpRequestHandling";
import {receiveUserData} from "SinglePageApp/Cache/Redux/UserRepository/Actions";
import {findApiToken, findApiTokenFromCookie} from "Common/Auth/Redux/Selectors";
import {findCookieContent, removeCookie, setCookie} from "Common/Utility/CookieHandling";
import {User} from "SinglePageApp/Cache/Redux/UserRepository/Types";
import {AppThunk} from "SinglePageApp/App";
import {getResponseBodyJson} from "Common/RequestHandling/Redux/Selectors";
import {getSecondsUntilExpiration, getTimeToLiveInDays} from "Common/Auth/JWT";
import {triggerJwtRefreshBeforeExpirationInSeconds} from "Common/config";

export function initializeAuth(getAuthState: () => AuthState): AppThunk {
    const apiToken = findApiTokenFromCookie();
    if(!apiToken) {
        return function(dispatch) {
            dispatch(receiveCurrentAuthUserData(null,null));
        }
    }
    return function(dispatch) {
        const isLoaderEnabled = true;
        dispatch(refreshApiTokenIfNeeded(getAuthState, apiToken, isLoaderEnabled));
        dispatch(setRefreshTokenInterval(getAuthState));
    }
}

function setRefreshTokenInterval(getAuthState: () => AuthState): AppThunk {
    return function (dispatch) {
        setInterval(() => {
            const apiToken = findApiToken(getAuthState());
            if(!apiToken) {
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
        dispatch(receiveCurrentAuthUserData(null,null));
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
        dispatch(executeRequest({
            request: request,
            onSuccess(summary: ExecutionSummary): void {
                // @ts-ignore
                const data = getResponseBodyJson(summary).data;
                setAuthUser(data.jwt, data.user, dispatch, shouldRemember);
            }
        }));
    }
}

function refreshApiTokenIfNeeded(getAuthState: () => AuthState, currentApiToken: string, isLoaderEnabled: boolean): AppThunk {
    return function(dispatch) {
        if(currentApiToken === null) {
            return;
        }
        const secondsUntilJwtExpiration = getSecondsUntilExpiration(currentApiToken);
        if(secondsUntilJwtExpiration > triggerJwtRefreshBeforeExpirationInSeconds) {
            return;
        }
        dispatch(fetchNewApiToken(getAuthState, currentApiToken, isLoaderEnabled));
    };
}

function fetchNewApiToken(getAuthState: () => AuthState, currentApiToken: string, isLoaderEnabled: boolean): AppThunk {
    return function (dispatch) {
        if(getAuthState().isFetchingApiToken) {
            return;
        }
        dispatch({type: AuthActionTypes.START_API_TOKEN_FETCH});
        const request = createGetRequest({
            url: AUTH_REFRESH_TOKEN_ENDPOINT,
            headers: {
                [API_TOKEN_HEADER_NAME]: currentApiToken
            },
            isLoaderEnabled: isLoaderEnabled,
        });
        dispatch(executeRequest({
            request: request,
            onSuccess(summary: ExecutionSummary): void {
                // @ts-ignore
                const data = getResponseBodyJson(summary).data;
                const shouldRemember = !!findCookieContent(API_TOKEN_COOKIE_NAME);
                setAuthUser(data.jwt, data.user, dispatch, shouldRemember);
            },
            onError(): void {
                dispatch(receiveCurrentAuthUserData(null, null));
                dispatch({type: AuthActionTypes.START_API_TOKEN_FETCH});
            }
        }));
    }
}

function setAuthUser(apiToken: string, user: User, dispatch: Function, shouldRemember: boolean): void {
    removeCookie(API_TOKEN_COOKIE_NAME);
    dispatch(receiveUserData(user));
    dispatch(receiveCurrentAuthUserData(apiToken, user.id));
    if(apiToken) {
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

function refreshApiTokenCookie(apiToken: string, shouldRemember: boolean): void {
    let settings = {
        name: API_TOKEN_COOKIE_NAME,
        content: apiToken,
    };
    if(shouldRemember) {
        settings = Object.assign({}, settings, {
            timeToLiveInDays: getTimeToLiveInDays(apiToken)
        });
    }
    setCookie(settings);
}