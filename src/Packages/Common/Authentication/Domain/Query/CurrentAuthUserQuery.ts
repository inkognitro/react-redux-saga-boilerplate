import { AuthState, AuthUser } from "../Types";

export function findCurrentAuthUser(state: AuthState): null | AuthUser {
    if (state.currentAuthUser) {
        return state.currentAuthUser;
    }
    return null;
}

export function isAuthenticationRunning(state: AuthState): boolean { //todo: check usage!
    return state.isAuthenticationRunning;
}
