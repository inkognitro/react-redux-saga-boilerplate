import {AuthActionType, AuthState} from "./types";

const initialAuthState: AuthState = {
    apiToken: null,
    user: null,
};

export function auth (state: AuthState = initialAuthState, action?: AuthActionType): AuthState {
    if(action === undefined) {
        return state;
    }

    //todo: have a look at redux-thunk for asnyc actions with promises!

    return state;
}