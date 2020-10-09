import { AuthUser } from "packages/common/types/auth-user/domain";
import { AuthState } from "./types";

export function getCurrentAuthUser(state: AuthState): AuthUser {
    return state.currentUser;
}

export function isCurrentUserInitializationRunning(state: AuthState): boolean {
    return state.isInitializationRunning;
}
