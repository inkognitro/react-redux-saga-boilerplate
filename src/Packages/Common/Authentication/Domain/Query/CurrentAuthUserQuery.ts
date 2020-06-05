import { AuthState, AuthUser } from "../Types";

export function findCurrentAuthUser(state: AuthState): null | AuthUser {
    if (state.currentAuthUser) {
        return state.currentAuthUser;
    }
    return null;
}

// todo: use for authentication refresh and change to "login" is running!
export function isAuthenticationRunning(state: AuthState): boolean {
    return state.isAuthenticationRunning;
}
