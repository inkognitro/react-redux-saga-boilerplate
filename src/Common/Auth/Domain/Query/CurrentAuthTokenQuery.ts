import {AuthState, AuthStateSelector} from "Common/Auth/Domain/Types";

function findCurrentAuthToken(state: AuthState): (null | string) {
    if(state.currentAuthUser) {
        return state.currentAuthUser.token;
    }
    return null;
}

export class CurrentAuthTokenReader {
    private readonly getAuthState: AuthStateSelector;

    constructor(getAuthState: AuthStateSelector) {
        this.getAuthState = getAuthState;
    }

    public find(): (null | string) {
        return findCurrentAuthToken(this.getAuthState());
    }
}