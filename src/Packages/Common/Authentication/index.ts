import {
    LogoutResult as LogoutResultType,
    LogoutSuccessResult as LogoutSuccessResultType,
    LogoutErrorResult as LogoutErrorResultType,
    LoginResult as LoginResultType,
    LoginSettings as LoginSettingsType,
    LoginErrorResult as LoginErrorResultType,
    LoginSuccessResult as LoginSuccessResultType,
    AuthUser as AuthUserType,
    AuthStateSelector as AuthStateSelectorType,
    AuthState as AuthStateType,
    AuthEvent as AuthEventType,
} from './Domain/Types';
import { Login as LoginType } from './Domain/Command/Login';
import { Logout as LogoutType } from './Domain/Command/Logout';
import { InitializeCurrentUser as InitializeCurrentUserType } from './Domain/Command/InitializeCurrentUser';
import { UserLoginWasCancelled as UserLoginWasCancelledType } from './Domain/Event/UserLoginWasCancelled';
import { UserWasLoggedOut as UserWasLoggedOutType } from './Domain/Event/UserWasLoggedOut';
import { UserAuthenticationWasRefreshed as UserAuthenticationWasRefreshedType } from './Domain/Event/UserAuthenticationWasRefreshed';
import { UserAuthenticationRefreshFailed as UserAuthenticationRefreshFailedType } from './Domain/Event/UserAuthenticationRefreshFailed';
import { UserAuthenticationRefreshWasRequested as UserAuthenticationRefreshWasRequestedType } from './Domain/Event/UserAuthenticationRefreshWasRequested';
import { UserLoginFailed as UserLoginFailedType } from './Domain/Event/UserLoginFailed';
import { UserLoginWasNotExecuted as UserLoginWasNotExecutedType } from './Domain/Event/UserLoginWasNotExecuted';
import { UserLoginWasRequested as UserLoginWasRequestedType } from './Domain/Event/UserLoginWasRequested';
import { UserLogoutWasNotExecuted as UserLogoutWasNotExecutedType } from './Domain/Event/UserLogoutWasNotExecuted';
import { UserWasLoggedIn as UserWasLoggedInType } from './Domain/Event/UserWasLoggedIn';

export type LogoutResult = LogoutResultType;
export type LogoutSuccessResult = LogoutSuccessResultType;
export type LogoutErrorResult = LogoutErrorResultType;
export type LoginResult = LoginResultType;
export type LoginSettings = LoginSettingsType;
export type LoginErrorResult = LoginErrorResultType;
export type LoginSuccessResult = LoginSuccessResultType;
export type AuthUser = AuthUserType;
export type AuthStateSelector = AuthStateSelectorType;
export type AuthState = AuthStateType;
export type AuthEvent = AuthEventType;
export type Login = LoginType;
export type Logout = LogoutType;
export type InitializeCurrentUser = InitializeCurrentUserType;
export type UserLoginWasCancelled = UserLoginWasCancelledType;
export type UserWasLoggedOut = UserWasLoggedOutType;
export type UserAuthenticationWasRefreshed = UserAuthenticationWasRefreshedType;
export type UserAuthenticationRefreshFailed = UserAuthenticationRefreshFailedType;
export type UserAuthenticationRefreshWasRequested = UserAuthenticationRefreshWasRequestedType;
export type UserLoginFailed = UserLoginFailedType;
export type UserLoginWasNotExecuted = UserLoginWasNotExecutedType;
export type UserLoginWasRequested = UserLoginWasRequestedType;
export type UserLogoutWasNotExecuted = UserLogoutWasNotExecutedType;
export type UserWasLoggedIn = UserWasLoggedInType;

export { AuthEventTypes, AuthCommandTypes } from './Domain/Types';
export { createAuthenticationSaga } from './Domain/Saga/Flow';
export { logout } from './Domain/Saga/CustomEffect/Logout';
export { login } from './Domain/Saga/CustomEffect/Login';
export { createLogin } from './Domain/Command/Login';
export { createLogout } from './Domain/Command/Logout';
export { createInitializeCurrentUser } from './Domain/Command/InitializeCurrentUser';
export { findCurrentAuthUser } from './Domain/Query/CurrentAuthUserQuery';
export { authenticationReducer } from './Domain/Reducer';
export const authTokenCookieName = 'authUser';
export const authTokenCookieTimeToLiveInDays = 14;
export const authRefreshBeforeExpirationInSeconds = 60;
