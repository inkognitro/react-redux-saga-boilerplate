import {AuthActions, AuthActionTypes, AuthState} from "./types";

const initialAuthState: AuthState = {
    currentUserHasBeenInitialized: false,
    currentUserId: null,
};

export function auth (state: AuthState = initialAuthState, action?: AuthActions): AuthState {
    if(action === undefined) {
        return state;
    }

    if(action.type === AuthActionTypes.SET_CURRENT_USER_ID) {
        return Object.assign({}, state, {
            currentUserHasBeenInitialized: true,
            currentUserId: action.payload.userId
        });
    }

    return state;
}