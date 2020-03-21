import {User} from "Common/UserManagement/Domain/UserRepository/Types";
import {UserAuthenticationRefreshFailed} from "Common/Auth/Domain/Event/UserAuthenticationRefreshFailed";
import {UserAuthenticationRefreshWasTriggered} from "Common/Auth/Domain/Event/UserAuthenticationRefreshWasTriggered";
import {UserAuthenticationFailed} from "Common/Auth/Domain/Event/UserAuthenticationFailed";
import {UserAuthenticationWasRefreshed} from "Common/Auth/Domain/Event/UserAuthenticationWasRefreshed";
import {UserAuthenticationWasTriggered} from "Common/Auth/Domain/Event/UserAuthenticationWasTriggered";
import {UserWasAuthenticated} from "Common/Auth/Domain/Event/UserWasAuthenticated";

export type AuthUser = {
    token: string,
    user: User,
};

export type AuthState = {
    isAuthenticationRunning: boolean,
    currentAuthUser: (null | AuthUser),
}

export enum AuthEventTypes {
    USER_AUTHENTICATION_WAS_TRIGGERED = 'USER_AUTHENTICATION_WAS_TRIGGERED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_WAS_AUTHENTICATED = 'USER_WAS_AUTHENTICATED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_AUTHENTICATION_WAS_REFRESHED = 'USER_AUTHENTICATION_WAS_REFRESHED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_AUTHENTICATION_REFRESH_WAS_TRIGGERED = 'USER_AUTHENTICATION_REFRESH_WAS_TRIGGERED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_AUTHENTICATION_FAILED = 'USER_AUTHENTICATION_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1',
    USER_AUTHENTICATION_REFRESH_FAILED = 'USER_AUTHENTICATION_REFRESH_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1',
}

export type AuthEvent = (
    UserAuthenticationRefreshFailed
    | UserAuthenticationRefreshWasTriggered
    | UserAuthenticationFailed
    | UserAuthenticationWasRefreshed
    | UserAuthenticationWasTriggered
    | UserWasAuthenticated
);

export type AuthStateSelector = () => AuthState;