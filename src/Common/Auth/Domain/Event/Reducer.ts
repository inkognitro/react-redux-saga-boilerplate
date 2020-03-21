import {AuthEvent, AuthEventTypes, AuthState} from "Common/Auth/Domain/Types";

const initialAuthState: AuthState = {
    isAuthenticationRunning: false,
    currentAuthUser: null,
};

export function auth (state: AuthState = initialAuthState, event?: AuthEvent): AuthState {
    if(!event) {
        return state;
    }

    if(event.type === AuthEventTypes.USER_AUTHENTICATION_WAS_TRIGGERED) {
        return {...state, isAuthenticationRunning: true};
    }

    if(event.type === AuthEventTypes.USER_WAS_AUTHENTICATED) {
        return {...state, currentAuthUser: event.payload.authUser, isAuthenticationRunning: false};
    }

    if(event.type === AuthEventTypes.USER_AUTHENTICATION_FAILED) {
        return {...state, currentAuthUser: null, isAuthenticationRunning: false};
    }

    if(event.type === AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_TRIGGERED) {
        return {...state, isAuthenticationRunning: true};
    }

    if(event.type === AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED) {
        return {...state, currentAuthUser: event.payload.authUser, isAuthenticationRunning: false};
    }

    if(event.type === AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED) {
        return {...state, currentAuthUser: null, isAuthenticationRunning: false};
    }

    return state;
}