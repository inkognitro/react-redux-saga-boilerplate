import {AuthActions, AuthActionTypes} from "./types";
import {
    AUTH_REFRESH_TOKEN_ENDPOINT,
    createGetRequest,
    executeRequest,
    ExecutionSummary
} from "App/Utility/Http/ApiRequestHandling";
import {receiveUser} from "App/Redux/Cache/UserRepository/actions";
import {findCurrentUser} from "App/Redux/Auth/selectors";
import {AppThunk, store} from "App/Redux/root";
import {getResponseBodyJson} from "App/Utility/Http/RequestHandling";

export function setCurrentUserId(userId: string): AuthActions {
    return {
        type: AuthActionTypes.SET_CURRENT_USER_ID,
        payload: {
            userId: userId
        }
    };
}

export function fetchNewApiTokenForCurrentUser(): AppThunk {
    const currentUser = findCurrentUser(store.getState());
    if (currentUser === null) {
        //return () => {};
    }
    return function (dispatch) {
        const request = createGetRequest({ //todo: change to POST request
            url: AUTH_REFRESH_TOKEN_ENDPOINT,
        });
        executeRequest(request).then((summary: ExecutionSummary) => {
            const json = getResponseBodyJson(summary);
            // @ts-ignore
            dispatch(receiveUser(json.data.user));
            // @ts-ignore
            dispatch(setCurrentUserId(json.data.user.id));
        });
    }
}