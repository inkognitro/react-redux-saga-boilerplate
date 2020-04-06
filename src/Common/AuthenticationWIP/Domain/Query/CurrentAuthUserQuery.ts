import {AuthState, AuthUser} from "Common/AuthenticationWIP/Domain/Types";

export function findCurrentAuthUser(state: AuthState): (null | AuthUser) {
    if(state.currentAuthUser) {
        return state.currentAuthUser;
    }
    return null;
}

export function isAuthenticationRunning(state: AuthState): boolean {
    return state.isAuthenticationRunning;
}