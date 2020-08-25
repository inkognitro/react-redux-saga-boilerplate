import { AuthUser } from "packages/entity/auth-user/domain";
import { AuthState } from "../Types";

export function getCurrentAuthUser(state: AuthState): AuthUser {
    return state.currentUser;
}

// todo: use for authentication refresh and change to "login" is running!
export function isAuthenticationRunning(state: AuthState): boolean {
    return state.isAuthenticationRunning;
}
