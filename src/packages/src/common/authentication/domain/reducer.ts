import { AnonymousAuthUser, AuthUserTypes } from "packages/entity/auth-user/domain";
import { AuthState } from "./types";
import {
    AuthEventTypes,
    UserAuthenticationRefreshFailed,
    UserAuthenticationRefreshWasRequested,
    UserAuthenticationWasRefreshed,
    UserLoginFailed,
    UserLoginWasCancelled,
    UserLoginWasRequested,
    UserWasLoggedIn,
    UserWasLoggedOut,
    CurrentUserWasInitialized,
    CurrentUserInitializationWasStarted,
    CurrentUserInitializationWasCancelled,
    UserAuthenticationRefreshWasCancelled,
} from "./event";

export type AuthEvent = (
    UserAuthenticationRefreshFailed
    | UserAuthenticationRefreshWasCancelled
    | UserAuthenticationRefreshWasRequested
    | UserLoginWasCancelled
    | UserLoginFailed
    | UserAuthenticationWasRefreshed
    | UserLoginWasRequested
    | UserWasLoggedIn
    | UserWasLoggedOut
    | CurrentUserInitializationWasStarted
    | CurrentUserWasInitialized
    | CurrentUserInitializationWasCancelled
);

const anonymousUser: AnonymousAuthUser = {
    type: AuthUserTypes.ANONYMOUS,
};

const initialAuthState: AuthState = {
    isInitializationRunning: false,
    isAuthenticationRunning: false,
    currentUser: anonymousUser,
};

export function authenticationReducer(
    state: AuthState = initialAuthState,
    event?: AuthEvent,
): AuthState {
    if (!event) {
        return state;
    }

    if (event.type === AuthEventTypes.USER_LOGIN_WAS_REQUESTED) {
        return { ...state, isAuthenticationRunning: true };
    }

    if (event.type === AuthEventTypes.USER_WAS_LOGGED_IN) {
        return {
            ...state,
            currentUser: event.payload.result.data.authUser,
            isAuthenticationRunning: false,
        };
    }

    if (event.type === AuthEventTypes.CURRENT_USER_INITIALIZATION_WAS_STARTED) {
        return {
            ...state,
            isInitializationRunning: true,
            isAuthenticationRunning: true,
        };
    }

    if (event.type === AuthEventTypes.CURRENT_USER_WAS_INITIALIZED) {
        return {
            ...state,
            currentUser: event.payload.authUser,
            isInitializationRunning: false,
            isAuthenticationRunning: false,
        };
    }

    if (event.type === AuthEventTypes.USER_LOGIN_FAILED) {
        return {
            ...state,
            currentUser: anonymousUser,
            isAuthenticationRunning: false,
        };
    }

    if (event.type === AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_REQUESTED) {
        return { ...state, isAuthenticationRunning: true };
    }

    if (event.type === AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED) {
        return {
            ...state,
            currentUser: event.payload.authUser,
            isAuthenticationRunning: false,
        };
    }

    if (event.type === AuthEventTypes.USER_LOGIN_WAS_CANCELLED) {
        return { ...state, currentUser: anonymousUser, isAuthenticationRunning: false };
    }

    if (event.type === AuthEventTypes.CURRENT_USER_INITIALIZATION_WAS_CANCELLED) {
        return { ...state, isInitializationRunning: false, isAuthenticationRunning: false };
    }

    if (event.type === AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED) {
        return { ...state, currentUser: anonymousUser, isAuthenticationRunning: false };
    }

    if (event.type === AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_CANCELLED) {
        return { ...state, isAuthenticationRunning: false };
    }

    if (event.type === AuthEventTypes.USER_WAS_LOGGED_OUT) {
        return { ...state, currentUser: anonymousUser };
    }

    return state;
}
