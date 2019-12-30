import {API_TOKEN_COOKIE_NAME, AuthActions, AuthActionTypes} from "./types";
import {
    API_TOKEN_HEADER_NAME, AUTH_AUTHENTICATE_ENDPOINT,
    AUTH_REFRESH_TOKEN_ENDPOINT,
    createGetRequest,
    executeRequest,
    ExecutionSummary
} from "App/Utility/Http/ApiRequestHandling";
import {receiveUserData} from "App/Redux/Cache/UserRepository/actions";
import {findCurrentUser, findCurrentUsersApiTokenFromCookie} from "App/Redux/Auth/selectors";
import {AppThunk, store} from "App/Redux/root";
import {getResponseBodyJson} from "App/Utility/Http/RequestHandling";
import {findCookieContent, setCookie} from "App/Utility/CookieHandling";
import {User} from "App/Redux/Cache/UserRepository/types";

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

export function authenticate(username: string, password: string): AppThunk {
    return function (dispatch) {
        const request = createGetRequest({ //todo: change to POST request!
            url: AUTH_AUTHENTICATE_ENDPOINT,
            queryParameters: { //todo: change to POST request body!
                username: username,
                password: password,
            },
        });
        executeRequest(request).then((summary: ExecutionSummary) => {
            // @ts-ignore
            const user = getResponseBodyJson(summary).data.user;
            setCurrentUser(user, dispatch);
        });
        //todo: check if catch is also needed. if yes, pass callback functions as props and don't return a promise!
    }
}

function fetchNewApiToken(currentApiToken: string): AppThunk {
    const currentUser = findCurrentUser(store.getState());
    if (currentUser === null) {
        return () => {};
    }
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
                dispatch(receiveUserData({id: currentUser.id, apiToken: null}));
                dispatch(setCurrentUserId(null));
            });
    }
}

function setCurrentUser(user: User, dispatch: Function): void {
    dispatch(receiveUserData(user));
    dispatch(setCurrentUserId(user.id));
    if(user.apiToken) {
        refreshApiTokenCookie(user.apiToken);
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

function refreshApiTokenCookie(apiToken: string): void {
    if(!findCookieContent(API_TOKEN_COOKIE_NAME)) {
        return;
    }
    setCookie({
        name: API_TOKEN_COOKIE_NAME,
        content: apiToken,
        timeToLiveInDays: 14, //todo: take value from jwt expiration date!
    });
}