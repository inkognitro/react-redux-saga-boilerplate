import { AnonymousAuthUser, AuthUserTypes } from 'packages/common/types/auth-user/domain';
import { AuthState } from './types';
import {
    AuthEventTypes,
    AuthenticationRefreshFailed,
    AuthenticationWasRefreshed,
    LoginFailed,
    LoginWasCancelled,
    UserWasLoggedIn,
    UserWasLoggedOut,
    CurrentUserWasInitialized,
    CurrentUserCouldNotBeInitialized,
} from './event';

export type AuthEvent =
    | AuthenticationRefreshFailed
    | LoginWasCancelled
    | LoginFailed
    | AuthenticationWasRefreshed
    | UserWasLoggedIn
    | UserWasLoggedOut
    | CurrentUserWasInitialized
    | CurrentUserCouldNotBeInitialized;

const anonymousUser: AnonymousAuthUser = {
    type: AuthUserTypes.ANONYMOUS,
};

export const initialAuthState: AuthState = {
    isInitializationRunning: true,
    currentUser: anonymousUser,
};

export function authenticationReducer(state: AuthState = initialAuthState, event?: AuthEvent): AuthState {
    if (!event) {
        return state;
    }
    switch (event.type) {
        case AuthEventTypes.CURRENT_USER_WAS_INITIALIZED:
            return {
                ...state,
                currentUser: event.payload.authUser,
                isInitializationRunning: false,
            };
        case AuthEventTypes.CURRENT_USER_COULD_NOT_BE_INITIALIZED:
            return { ...state, isInitializationRunning: false };
        case AuthEventTypes.USER_WAS_LOGGED_IN:
            return {
                ...state,
                currentUser: event.payload.result.data.authUser,
            };
        case AuthEventTypes.AUTHENTICATION_WAS_REFRESHED:
            return { ...state, currentUser: event.payload.authUser };
        case AuthEventTypes.AUTHENTICATION_REFRESH_FAILED:
            return { ...state, currentUser: anonymousUser };
        case AuthEventTypes.USER_WAS_LOGGED_OUT:
            return { ...state, currentUser: anonymousUser };
        default:
            return state;
    }
}
