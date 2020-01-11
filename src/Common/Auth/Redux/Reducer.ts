import {AuthActions, AuthActionTypes, AuthState} from "./Types";

const initialAuthState: AuthState = {
    hasCurrentUserBeenInitialized: false,
    currentUserId: null,
};

export function auth (state: AuthState = initialAuthState, action?: AuthActions): AuthState {
    if(action === undefined) {
        return state;
    }

    if(action.type === AuthActionTypes.SET_CURRENT_USER_ID) {
        return Object.assign({}, state, {
            hasCurrentUserBeenInitialized: true,
            currentUserId: action.payload.userId
        });
    }

    return state;
}