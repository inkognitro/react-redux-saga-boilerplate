import {AuthActions, AuthActionTypes} from "./Types";
import {AuthState} from "Common/Auth/Domain/Types";

const initialAuthState: AuthState = {
    isFetchingApiToken: false,
    apiToken: null,
    currentUserId: null,
};

export function auth (state: AuthState = initialAuthState, action?: AuthActions): AuthState {
    if(action === undefined) {
        return state;
    }

    if(action.type === AuthActionTypes.RECEIVE_CURRENT_AUTH_USER_DATA) {
        return Object.assign({}, state, {
            apiToken: action.payload.apiToken,
            currentUserId: action.payload.userId
        });
    }

    if(action.type === AuthActionTypes.START_API_TOKEN_FETCH) {
        return Object.assign({}, state, {
            isFetchingApiToken: true,
        });
    }

    if(action.type === AuthActionTypes.END_API_TOKEN_FETCH) {
        return Object.assign({}, state, {
            isFetchingApiToken: false,
        });
    }

    return state;
}