import { Event } from "packages/common/types/util/domain";
import { AuthenticatedAuthUser, AuthUser } from "packages/common/types/auth-user/domain";
import { LoginErrorResult, LoginSuccessResult } from "./types";

export enum AuthEventTypes {
    CURRENT_USER_WAS_INITIALIZED = "CURRENT_USER_WAS_INITIALIZED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    CURRENT_USER_COULD_NOT_BE_INITIALIZED = "CURRENT_USER_COULD_NOT_BE_INITIALIZED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    LOGIN_WAS_CANCELLED = "LOGIN_WAS_CANCELLED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_WAS_LOGGED_IN = "USER_WAS_LOGGED_IN-42db2e56-7772-436f-91bc-17b2ba6798a1",
    LOGIN_FAILED = "LOGIN_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    AUTHENTICATION_WAS_REFRESHED = "AUTHENTICATION_WAS_REFRESHED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    AUTHENTICATION_REFRESH_FAILED = "AUTHENTICATION_REFRESH_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_WAS_LOGGED_OUT = "USER_WAS_LOGGED_OUT-42db2e56-7772-436f-91bc-17b2ba6798a1",
}

export type CurrentUserWasInitialized = Event<AuthEventTypes.CURRENT_USER_WAS_INITIALIZED, { authUser: AuthenticatedAuthUser }>
export function createCurrentUserWasInitialized(authUser: AuthenticatedAuthUser): CurrentUserWasInitialized {
    return {
        type: AuthEventTypes.CURRENT_USER_WAS_INITIALIZED,
        payload: { authUser },
    };
}

export type CurrentUserCouldNotBeInitialized = Event<AuthEventTypes.CURRENT_USER_COULD_NOT_BE_INITIALIZED>
export function createCurrentUserCouldNotBeInitialized(): CurrentUserCouldNotBeInitialized {
    return {
        type: AuthEventTypes.CURRENT_USER_COULD_NOT_BE_INITIALIZED,
        payload: undefined,
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

export type AuthenticationRefreshFailed = Event<AuthEventTypes.AUTHENTICATION_REFRESH_FAILED>;
export function createUserAuthenticationRefreshFailed(): AuthenticationRefreshFailed {
    return {
        type: AuthEventTypes.AUTHENTICATION_REFRESH_FAILED,
        payload: undefined,
    };
}

export type LoginFailed = Event<AuthEventTypes.LOGIN_FAILED, { result: LoginErrorResult, taskId: string }>
export function createLoginFailed(result: LoginErrorResult, taskId: string): LoginFailed {
    return {
        type: AuthEventTypes.LOGIN_FAILED,
        payload: { result, taskId },
    };
}

export type LoginWasCancelled = Event<AuthEventTypes.LOGIN_WAS_CANCELLED, { taskId: string }>
export function createLoginWasCancelled(taskId: string): LoginWasCancelled {
    return {
        type: AuthEventTypes.LOGIN_WAS_CANCELLED,
        payload: { taskId },
    };
}

export type UserWasLoggedIn = Event<AuthEventTypes.USER_WAS_LOGGED_IN, { result: LoginSuccessResult, taskId: string }>
export function createUserWasLoggedIn(result: LoginSuccessResult, taskId: string): UserWasLoggedIn {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_IN,
        payload: { result, taskId },
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT, { authUser: AuthUser }>
export function createUserWasLoggedOut(authUser: AuthenticatedAuthUser): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload: { authUser },
    };
}
