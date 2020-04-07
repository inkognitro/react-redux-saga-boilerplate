import {UserAuthenticationRefreshFailed} from "Common/AuthenticationWIP/Domain/Event/UserAuthenticationRefreshFailed";
import {UserAuthenticationRefreshWasRequested} from "Common/AuthenticationWIP/Domain/Event/UserAuthenticationRefreshWasRequested";
import {UserLoginFailed} from "Common/AuthenticationWIP/Domain/Event/UserLoginFailed";
import {UserAuthenticationWasRefreshed} from "Common/AuthenticationWIP/Domain/Event/UserAuthenticationWasRefreshed";
import {UserLoginWasRequested} from "Common/AuthenticationWIP/Domain/Event/UserLoginWasRequested";
import {UserWasLoggedIn} from "Common/AuthenticationWIP/Domain/Event/UserWasLoggedIn";
import {UserWasLoggedOut} from "Common/AuthenticationWIP/Domain/Event/UserWasLoggedOut";
import {User} from "Common/Model/Domain/User";
import {UserLoginWasCancelled} from "Common/AuthenticationWIP/Domain/Event/UserLoginWasCancelled";

export type AuthUser = {
    token: string,
    user: User,
};

export type AuthState = {
    isAuthenticationRunning: boolean,
    currentAuthUser: (null | AuthUser),
}

export enum AuthEventTypes {
    USER_LOGIN_WAS_REQUESTED = 'USER_LOGIN_WAS_REQUESTED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_LOGIN_WAS_CANCELLED = 'USER_LOGIN_WAS_CANCELLED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_WAS_LOGGED_IN = 'USER_WAS_LOGGED_IN-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_LOGIN_FAILED = 'USER_LOGIN_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_AUTHENTICATION_WAS_REFRESHED = 'USER_AUTHENTICATION_WAS_REFRESHED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_AUTHENTICATION_REFRESH_WAS_REQUESTED = 'USER_AUTHENTICATION_REFRESH_WAS_REQUESTED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_AUTHENTICATION_REFRESH_FAILED = 'USER_AUTHENTICATION_REFRESH_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_WAS_LOGGED_OUT = 'USER_WAS_LOGGED_OUT-42db2e56-7772-436f-91bc-17b2ba6798a1',
}

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

export type AuthStateSelector<State = any> = (state: State) => AuthState