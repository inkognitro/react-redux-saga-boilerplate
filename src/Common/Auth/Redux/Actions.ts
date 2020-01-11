import {API_TOKEN_COOKIE_NAME, AuthActions, AuthActionTypes} from "./Types";
import {
    API_TOKEN_HEADER_NAME, AUTH_AUTHENTICATE_ENDPOINT,
    AUTH_REFRESH_TOKEN_ENDPOINT,
    createGetRequest,
    executeRequest,
    ExecutionSummary
} from "MainApp/Utility/ApiHttpRequestHandling";
import {receiveUserData} from "MainApp/Cache/Redux/UserRepository/Actions";
import {findCurrentUsersApiTokenFromCookie} from "Common/Auth/Redux/Selectors";
import {findCookieContent, removeCookie, setCookie} from "Common/Utility/CookieHandling";
import {User} from "MainApp/Cache/Redux/UserRepository/Types";
import {AppThunk} from "MainApp/App";
import {getResponseBodyJson} from "Common/RequestHandling/Redux/Selectors";

export function initializeCurrentUser(): AppThunk {
    const apiToken = findCurrentUsersApiTokenFromCookie();
    if(!apiToken) {
        return function(dispatch) {
            dispatch(setCurrentUserId(null));
        }
    }
    return function(dispatch) {
        dispatch(fetchNewApiToken(apiToken));
    }
}

export function logout(): AppThunk {
    return function (dispatch) {
        removeCookie(API_TOKEN_COOKIE_NAME);
        dispatch(setCurrentUserId(null));
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
                removeCookie(API_TOKEN_COOKIE_NAME);
                // @ts-ignore
                const user = getResponseBodyJson(summary).data.user;
                setCurrentUser(user, dispatch, shouldRemember);
            }
        }));
    }
}

function fetchNewApiToken(currentApiToken: string): AppThunk {
    return function (dispatch) {
        const request = createGetRequest({
            url: AUTH_REFRESH_TOKEN_ENDPOINT,
            headers: {
                [API_TOKEN_HEADER_NAME]: currentApiToken
            },
            isLoaderEnabled: true,
        });
        dispatch(executeRequest({
            request: request,
            onSuccess(summary: ExecutionSummary): void {
                // @ts-ignore
                const user = getResponseBodyJson(summary).data.user;
                setCurrentUser(user, dispatch);
            },
            onError(): void {
                dispatch(setCurrentUserId(null));
            }
        }));
    }
}

function setCurrentUser(user: User, dispatch: Function, shouldRemember?: boolean): void {
    dispatch(receiveUserData(user));
    dispatch(setCurrentUserId(user.id));
    if(user.apiToken) {
        refreshApiTokenCookie(user.apiToken, shouldRemember);
    }
}

function setCurrentUserId(userId: (null | string)): AuthActions {
    return {
        type: AuthActionTypes.SET_CURRENT_USER_ID,
        payload: {
            userId: userId
        }
    };
}

function refreshApiTokenCookie(apiToken: string, shouldRemember?: boolean): void {
    let settings = {
        name: API_TOKEN_COOKIE_NAME,
        content: apiToken,
    };
    if(shouldRemember || findCookieContent(API_TOKEN_COOKIE_NAME)) {
        settings = Object.assign({}, settings, {
            timeToLiveInDays: 14 //todo: take value from jwt expiration date!
        });
    }
    setCookie(settings);
}