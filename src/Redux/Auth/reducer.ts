import {AuthActionType, AuthState} from "./types";

const initialAuthState: AuthState = {
    currentUserId: '8e5ae1bc-7f5f-49b8-8aff-2c6a5955c612', //todo: replace with null!
};

export function auth (state: AuthState = initialAuthState, action?: AuthActionType): AuthState {
    if(action === undefined) {
        return state;
    }

    //todo: have a look at redux-thunk for asnyc actions with promises!

    return state;
}