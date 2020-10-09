import { Event } from "packages/common/entity-base/common-types";
import { AuthenticatedAuthUser } from "packages/common/entity-base/auth-user/domain";
import { LoginErrorResult, LoginSettings, LoginSuccessResult } from "./types";

export enum AuthEventTypes {
    USER_LOGIN_WAS_REQUESTED = "USER_LOGIN_WAS_REQUESTED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_LOGIN_WAS_CANCELLED = "USER_LOGIN_WAS_CANCELLED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_LOGIN_WAS_NOT_EXECUTED = "USER_LOGIN_WAS_NOT_EXECUTED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_LOGOUT_WAS_NOT_EXECUTED = "USER_LOGOUT_WAS_NOT_EXECUTED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_WAS_LOGGED_IN = "USER_WAS_LOGGED_IN-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_LOGIN_FAILED = "USER_LOGIN_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_AUTHENTICATION_WAS_REFRESHED = "USER_AUTHENTICATION_WAS_REFRESHED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_AUTHENTICATION_REFRESH_WAS_REQUESTED = "USER_AUTHENTICATION_REFRESH_WAS_REQUESTED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_AUTHENTICATION_REFRESH_FAILED = "USER_AUTHENTICATION_REFRESH_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_AUTHENTICATION_REFRESH_WAS_CANCELLED = "USER_AUTHENTICATION_REFRESH_WAS_CANCELLED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    USER_WAS_LOGGED_OUT = "USER_WAS_LOGGED_OUT-42db2e56-7772-436f-91bc-17b2ba6798a1",
    CURRENT_USER_INITIALIZATION_WAS_STARTED = "CURRENT_USER_INITIALIZATION_WAS_STARTED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    CURRENT_USER_WAS_INITIALIZED = "CURRENT_USER_WAS_INITIALIZED-42db2e56-7772-436f-91bc-17b2ba6798a1",
    CURRENT_USER_INITIALIZATION_WAS_CANCELLED = "CURRENT_USER_INITIALIZATION_WAS_CANCELLED-42db2e56-7772-436f-91bc-17b2ba6798a1",
}

export function createUserAuthenticationRefreshWasCancelled(): UserAuthenticationRefreshWasCancelled {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_CANCELLED,
        payload: undefined,
    };
}

export type UserAuthenticationRefreshWasCancelled = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_CANCELLED>;

export function createUserAuthenticationRefreshFailed(): UserAuthenticationRefreshFailed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED,
        payload: undefined,
    };
}

export type UserAuthenticationRefreshFailed = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED>;

export function createUserAuthenticationRefreshWasRequested(
    authUser: AuthenticatedAuthUser,
): UserAuthenticationRefreshWasRequested {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_REQUESTED,
        payload: { authUser },
    };
}

export type CurrentUserInitializationWasStarted = Event<AuthEventTypes.CURRENT_USER_INITIALIZATION_WAS_STARTED>;

export function createCurrentUserInitializationWasStarted(): CurrentUserInitializationWasStarted {
    return {
        type: AuthEventTypes.CURRENT_USER_INITIALIZATION_WAS_STARTED,
        payload: undefined,
    };
}

export type CurrentUserInitializationWasCancelled = Event<AuthEventTypes.CURRENT_USER_INITIALIZATION_WAS_CANCELLED>;

export function createCurrentUserInitializationWasCancelled(): CurrentUserInitializationWasCancelled {
    return {
        type: AuthEventTypes.CURRENT_USER_INITIALIZATION_WAS_CANCELLED,
        payload: undefined,
    };
}

export type UserAuthenticationRefreshWasRequested = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_REQUESTED, {
    authUser: AuthenticatedAuthUser;
}>;

export function createCurrentUserWasInitialized(authUser: AuthenticatedAuthUser): CurrentUserWasInitialized {
    return {
        type: AuthEventTypes.CURRENT_USER_WAS_INITIALIZED,
        payload: { authUser },
    };
}

export type CurrentUserWasInitialized = Event<AuthEventTypes.CURRENT_USER_WAS_INITIALIZED, {
    authUser: AuthenticatedAuthUser;
}>;

export function createUserAuthenticationWasRefreshed(
    authUser: AuthenticatedAuthUser,
    previousAuthUser: AuthenticatedAuthUser,
): UserAuthenticationWasRefreshed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED,
        payload: { authUser, previousAuthUser },
    };
}

export type UserAuthenticationWasRefreshed = Event<AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED, {
    authUser: AuthenticatedAuthUser;
    previousAuthUser: AuthenticatedAuthUser;
}>;

export function createUserLoginFailed(loginSettings: LoginSettings, result: LoginErrorResult): UserLoginFailed {
    return {
        type: AuthEventTypes.USER_LOGIN_FAILED,
        payload: { loginSettings, result },
    };
}

export type UserLoginFailed = Event<AuthEventTypes.USER_LOGIN_FAILED, {
    loginSettings: LoginSettings
    result: LoginErrorResult
}>;

export function createUserLoginWasCancelled(loginSettings: LoginSettings): UserLoginWasCancelled {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_CANCELLED,
        payload: { loginSettings },
    };
}

export type UserLoginWasCancelled = Event<AuthEventTypes.USER_LOGIN_WAS_CANCELLED, {
    loginSettings: LoginSettings;
}>;

export function createUserLoginWasNotExecuted(loginSettings: LoginSettings): UserLoginWasNotExecuted {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_NOT_EXECUTED,
        payload: { loginSettings },
    };
}

export type UserLoginWasNotExecuted = Event<AuthEventTypes.USER_LOGIN_WAS_NOT_EXECUTED, {
    loginSettings: LoginSettings;
}>;

export function createUserUserLoginWasRequested(loginSettings: LoginSettings): UserLoginWasRequested {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_REQUESTED,
        payload: { loginSettings },
    };
}

export type UserLoginWasRequested = Event<AuthEventTypes.USER_LOGIN_WAS_REQUESTED, {
    loginSettings: LoginSettings
}>;

export function createUserLogoutWasNotExecuted(logoutId: string): UserLogoutWasNotExecuted {
    return {
        type: AuthEventTypes.USER_LOGOUT_WAS_NOT_EXECUTED,
        payload: { logoutId },
    };
}

export type UserLogoutWasNotExecuted = Event<AuthEventTypes.USER_LOGOUT_WAS_NOT_EXECUTED, {
    logoutId: string;
}>;

export function createUserWasLoggedIn(loginSettings: LoginSettings, result: LoginSuccessResult): UserWasLoggedIn {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_IN,
        payload: { loginSettings, result },
    };
}

export type UserWasLoggedIn = Event<AuthEventTypes.USER_WAS_LOGGED_IN, {
    loginSettings: LoginSettings
    result: LoginSuccessResult
}>
type UserWasLoggedOutPayload = {
    authUser: AuthenticatedAuthUser
    logoutId: string
}

export function createUserWasLoggedOut(payload: UserWasLoggedOutPayload): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload,
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT, UserWasLoggedOutPayload>;
