import { AuthUser } from "packages/entity/auth-user/domain";
import { AuthState } from "./types";

export function getCurrentAuthUser(state: AuthState): AuthUser {
    return state.currentUser;
}

export function isCurrentUserInitializationRunning(state: AuthState): boolean {
    return state.isInitializationRunning;
}

// todo: use for authentication refresh and change to "login" is running!
export function isAuthenticationRunning(state: AuthState): boolean {
    return state.isAuthenticationRunning;
}
