import {User} from "Common/UserManagement/Domain/UserRepository/Types";
import {UserAuthenticationRefreshFailed} from "Common/Auth/Domain/Event/UserAuthenticationRefreshFailed";
import {UserAuthenticationRefreshWasStarted} from "Common/Auth/Domain/Event/UserAuthenticationRefreshWasStarted";
import {UserLoginFailed} from "Common/Auth/Domain/Event/UserLoginFailed";
import {UserAuthenticationWasRefreshed} from "Common/Auth/Domain/Event/UserAuthenticationWasRefreshed";
import {UserLoginWasStarted} from "Common/Auth/Domain/Event/UserLoginWasStarted";
import {UserWasLoggedIn} from "Common/Auth/Domain/Event/UserWasLoggedIn";
import {UserWasLoggedOut} from "Common/Auth/Domain/Event/UserWasLoggedOut";

export type AuthUser = {
    token: string,
    user: User,
};

export type AuthState = {
    isAuthenticationRunning: boolean,
    currentAuthUser: (null | AuthUser),
}

export enum AuthEventTypes {
    USER_LOGIN_WAS_STARTED = 'USER_LOGIN_WAS_STARTED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_WAS_LOGGED_IN = 'USER_WAS_LOGGED_IN-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_LOGIN_FAILED = 'USER_LOGIN_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_AUTHENTICATION_WAS_REFRESHED = 'USER_AUTHENTICATION_WAS_REFRESHED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_AUTHENTICATION_REFRESH_WAS_STARTED = 'USER_AUTHENTICATION_REFRESH_WAS_STARTED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_AUTHENTICATION_REFRESH_FAILED = 'USER_AUTHENTICATION_REFRESH_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_WAS_LOGGED_OUT = 'USER_WAS_LOGGED_OUT-42db2e56-7772-436f-91bc-17b2ba6798a1',
}

export type AuthEvent = (
    UserAuthenticationRefreshFailed
    | UserAuthenticationRefreshWasStarted
    | UserLoginFailed
    | UserAuthenticationWasRefreshed
    | UserLoginWasStarted
    | UserWasLoggedIn
    | UserWasLoggedOut
);

export type AuthStateSelector = () => AuthState;