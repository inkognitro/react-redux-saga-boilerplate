import {
    AuthState as AuthStateType,
    AuthStateSelector as AuthStateSelectorType,
    LoginResult as LoginResultType,
    LogoutResult as LogoutResultType,
} from './Types';

export type AuthStateSelector = AuthStateSelectorType;
export type AuthState = AuthStateType;
export type LoginResult = LoginResultType;
export type LogoutResult = LogoutResultType;

export { AuthCommandTypes } from "./Command/Types";
export { AuthEventTypes } from './Event/Types';

export { createAuthenticationSaga } from './Saga/Flow';
export { logout } from './Saga/CustomEffect/Logout';
export { login } from './Saga/CustomEffect/Login';
export { createLogin } from './Command/Login';
export { createLogout } from './Command/Logout';
export { createInitializeCurrentUser } from './Command/InitializeCurrentUser';
export { getCurrentAuthUser } from './Query/CurrentAuthUserQuery';
export { authenticationReducer } from './Reducer';
