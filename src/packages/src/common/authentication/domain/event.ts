import { Event } from "packages/common/types/util/domain";
import {AuthenticatedAuthUser, AuthUser} from "packages/common/types/auth-user/domain";
import { LoginErrorResult, LoginSettings, LoginSuccessResult } from "./types";

export enum AuthEventTypes {
    USER_LOGIN_WAS_REQUESTED = "USER_LOGIN_WAS_REQUESTED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    LOGIN_WAS_CANCELLED = "USER_LOGIN_WAS_CANCELLED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_LOGIN_WAS_NOT_EXECUTED = "USER_LOGIN_WAS_NOT_EXECUTED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_LOGOUT_WAS_NOT_EXECUTED = "USER_LOGOUT_WAS_NOT_EXECUTED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_WAS_LOGGED_IN = "USER_WAS_LOGGED_IN-42db2e56-7772-436f-91bc-17b2ba6798a1",
    LOGIN_FAILED = "USER_LOGIN_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    AUTHENTICATION_WAS_REFRESHED = "USER_AUTHENTICATION_WAS_REFRESHED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_AUTHENTICATION_REFRESH_WAS_REQUESTED = "USER_AUTHENTICATION_REFRESH_WAS_REQUESTED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    AUTHENTICATION_REFRESH_FAILED = "USER_AUTHENTICATION_REFRESH_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_AUTHENTICATION_REFRESH_WAS_CANCELLED = "USER_AUTHENTICATION_REFRESH_WAS_CANCELLED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_WAS_LOGGED_OUT = "USER_WAS_LOGGED_OUT-42db2e56-7772-436f-91bc-17b2ba6798a1",
    CURRENT_USER_INITIALIZATION_WAS_STARTED = "CURRENT_USER_INITIALIZATION_WAS_STARTED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    CURRENT_USER_WAS_INITIALIZED = "CURRENT_USER_WAS_INITIALIZED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    CURRENT_USER_INITIALIZATION_WAS_CANCELLED = "CURRENT_USER_INITIALIZATION_WAS_CANCELLED-42db2e56-7772-436f-91bc-17b2ba6798a1",
}

export type AuthenticationRefreshFailed = Event<AuthEventTypes.AUTHENTICATION_REFRESH_FAILED>;
export function createUserAuthenticationRefreshFailed(): AuthenticationRefreshFailed {
    return {
        type: AuthEventTypes.AUTHENTICATION_REFRESH_FAILED,
        payload: undefined,
    };
}

export type CurrentUserWasInitialized = Event<AuthEventTypes.CURRENT_USER_WAS_INITIALIZED, {
    authUser: AuthenticatedAuthUser
}>
export function createCurrentUserWasInitialized(authUser: AuthenticatedAuthUser): CurrentUserWasInitialized {
    return {
        type: AuthEventTypes.CURRENT_USER_WAS_INITIALIZED,
        payload: { authUser },
    };
}

export type AuthenticationWasRefreshed = Event<AuthEventTypes.AUTHENTICATION_WAS_REFRESHED, {
    authUser: AuthenticatedAuthUser;
    previousAuthUser: AuthenticatedAuthUser;
}>
export function createAuthenticationWasRefreshed(
    authUser: AuthenticatedAuthUser,
    previousAuthUser: AuthenticatedAuthUser,
): AuthenticationWasRefreshed {
    return {
        type: AuthEventTypes.AUTHENTICATION_WAS_REFRESHED,
        payload: { authUser, previousAuthUser },
    };
}

export type UserLoginFailed = Event<AuthEventTypes.LOGIN_FAILED, {}>
export function createUserLoginFailed(result: LoginErrorResult): UserLoginFailed {
    return {
        type: AuthEventTypes.LOGIN_FAILED,
        payload: { result },
    };
}

export type UserLoginWasCancelled = Event<AuthEventTypes.LOGIN_WAS_CANCELLED>
export function createUserLoginWasCancelled(): UserLoginWasCancelled {
    return {
        type: AuthEventTypes.LOGIN_WAS_CANCELLED,
        payload: undefined,
    };
}

export type UserWasLoggedIn = Event<AuthEventTypes.USER_WAS_LOGGED_IN, { authUser: AuthUser }>
export function createUserWasLoggedIn(authUser: AuthenticatedAuthUser): UserWasLoggedIn {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_IN,
        payload: { authUser },
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT, { authUser: AuthUser }>
export function createUserWasLoggedOut(authUser: AuthenticatedAuthUser): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload: { authUser },
    };
}
