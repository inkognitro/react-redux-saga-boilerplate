import { AnonymousAuthUser, AuthUserTypes } from "packages/entity/auth-user/domain";
import { AuthEventTypes } from "./Event/Types";
import { UserAuthenticationRefreshFailed } from "./Event/UserAuthenticationRefreshFailed";
import { UserAuthenticationRefreshWasRequested } from "./Event/UserAuthenticationRefreshWasRequested";
import { UserLoginWasCancelled } from "./Event/UserLoginWasCancelled";
import { UserLoginFailed } from "./Event/UserLoginFailed";
import { UserAuthenticationWasRefreshed } from "./Event/UserAuthenticationWasRefreshed";
import { UserLoginWasRequested } from "./Event/UserLoginWasRequested";
import { UserWasLoggedIn } from "./Event/UserWasLoggedIn";
import { UserWasLoggedOut } from "./Event/UserWasLoggedOut";
import { AuthState } from "./Types";

export type AuthEvent = (
    UserAuthenticationRefreshFailed
    | UserAuthenticationRefreshWasRequested
    | UserLoginWasCancelled
    | UserLoginFailed
    | UserAuthenticationWasRefreshed
    | UserLoginWasRequested
    | UserWasLoggedIn
    | UserWasLoggedOut
);

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
