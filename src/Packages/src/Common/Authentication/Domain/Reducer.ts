import { AnonymousAuthUser, AuthUserTypes } from "Packages/Entity/AuthUser";
import { AuthEvent, AuthEventTypes, AuthState } from "./Types";

const anonymousUser: AnonymousAuthUser = {
    type: AuthUserTypes.ANONYMOUS,
};

const initialAuthState: AuthState = {
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

    if (event.type === AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED) {
        return { ...state, currentUser: anonymousUser, isAuthenticationRunning: false };
    }

    if (event.type === AuthEventTypes.USER_WAS_LOGGED_OUT) {
        return { ...state, currentUser: anonymousUser };
    }

    return state;
}
