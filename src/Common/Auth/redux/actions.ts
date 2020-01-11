import {API_TOKEN_COOKIE_NAME, AuthActions, AuthActionTypes} from "./types";
import {
    API_TOKEN_HEADER_NAME, AUTH_AUTHENTICATE_ENDPOINT,
    AUTH_REFRESH_TOKEN_ENDPOINT,
    createGetRequest,
    executeRequest,
    ExecutionSummary
} from "Common/Utility/Http/ApiRequestHandling";
import {receiveUserData} from "Common/Cache/redux/UserRepository/actions";
import {findCurrentUsersApiTokenFromCookie} from "Common/Auth/redux/selectors";
import {getResponseBodyJson} from "Common/Utility/Http/RequestHandling";
import {findCookieContent, removeCookie, setCookie} from "Common/Utility/CookieHandling";
import {User} from "Common/Cache/redux/UserRepository/types";
import {AppThunk} from "MainApp/App";

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
        });
        executeRequest(request).then((summary: ExecutionSummary) => {
            removeCookie(API_TOKEN_COOKIE_NAME);
            // @ts-ignore
            const user = getResponseBodyJson(summary).data.user;
            setCurrentUser(user, dispatch, shouldRemember);
        });
        //todo: check if catch is also needed. if yes, pass callback functions as props and don't return a promise!
    }
}

function fetchNewApiToken(currentApiToken: string): AppThunk {
    return function (dispatch) {
        const request = createGetRequest({
            url: AUTH_REFRESH_TOKEN_ENDPOINT,
            headers: {
                [API_TOKEN_HEADER_NAME]: currentApiToken
            },
        });
        executeRequest(request)
            .then((summary: ExecutionSummary) => {
                // @ts-ignore
                const user = getResponseBodyJson(summary).data.user;
                setCurrentUser(user, dispatch);
            })
            .catch(() => {
                dispatch(setCurrentUserId(null));
            });
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