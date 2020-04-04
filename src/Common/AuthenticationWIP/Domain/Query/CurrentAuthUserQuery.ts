import {AuthState, AuthStateSelector, AuthUser} from "Common/AuthenticationWIP/Domain/Types";

export function findCurrentAuthUser(state: AuthState): (null | AuthUser) {
    if(state.currentAuthUser) {
        return state.currentAuthUser;
    }
    return null;
}

export class CurrentAuthUserReader {
    private readonly getAuthState: AuthStateSelector;

    constructor(getAuthState: AuthStateSelector) {
        this.getAuthState = getAuthState;
    }

    public find(): (null | AuthUser) {
        return findCurrentAuthUser(this.getAuthState());
    }
}