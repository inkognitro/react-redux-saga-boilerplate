import {AuthActions, AuthActionTypes} from "./types";
import {
    AUTH_REFRESH_TOKEN_ENDPOINT,
    createGetRequest,
    executeRequest,
    ExecutionSummary
} from "App/Utility/Http/ApiRequestHandling";
import {receiveUserData} from "App/Redux/Cache/UserRepository/actions";
import {findCurrentUser} from "App/Redux/Auth/selectors";
import {AppThunk, store} from "App/Redux/root";
import {getResponseBodyJson} from "App/Utility/Http/RequestHandling";

export function refreshApiToken (userId: string): AuthActions {
    return {
        type: AuthActionTypes.REFRESH_API_TOKEN,
        payload: {
            userId: userId
        }
    };
}

export function fetchRefreshedCurrentUserApiToken(): AppThunk {
    const currentUser = findCurrentUser(store.getState());
    if(currentUser === null) {
        return () => {

        };
    }
    return function(dispatch) {
        const request = createGetRequest({ //todo: change to POST request
            url: AUTH_REFRESH_TOKEN_ENDPOINT,
        });
        executeRequest(request).then((summary: ExecutionSummary) => {
            const json = getResponseBodyJson(summary);
            dispatch(receiveUserData({
                id: currentUser.id,
                // @ts-ignore
                apiToken: json.apiToken
            }));
        });
    }
}