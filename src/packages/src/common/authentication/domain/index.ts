import {
    AuthState as AuthStateType,
    AuthStateSelector as AuthStateSelectorType,
    LoginResult as LoginResultType,
    CurrentUserStorage as CurrentUserStorageType,
} from './types';

export type CurrentUserStorage = CurrentUserStorageType;
export type AuthStateSelector = AuthStateSelectorType;
export type AuthState = AuthStateType;
export type LoginResult = LoginResultType;

export { createAuthenticationSaga } from './saga/flow';
export { logout, login } from './saga/effect';
export { authenticationReducer, initialAuthState } from './reducer';
export { createLogout, createLogin } from './command';
export { getCurrentAuthUser, isCurrentUserInitializationRunning } from './query';
export { createPseudoJWT } from './jwt.handling';
