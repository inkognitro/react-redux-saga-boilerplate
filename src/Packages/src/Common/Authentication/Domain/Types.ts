import { ErrorResult, SuccessResult } from "Packages/Entity/CommonTypes";
import { AuthenticatedAuthUser, AuthUser } from "Packages/Entity/AuthUser/Domain";

export type AuthState = {
    isAuthenticationRunning: boolean
    currentUser: AuthUser
};

export type AuthStateSelector<State = any> = (state: State) => AuthState;

export type LoginSettings = {
    loginId: string,
    username: string;
    password: string;
    shouldRemember: boolean;
};

export type LoginSuccessResult = SuccessResult<{ authUser: AuthenticatedAuthUser }>
export type LoginErrorResult = ErrorResult
export type LoginResult = (LoginSuccessResult | LoginErrorResult)

export type LogoutSuccessResult = SuccessResult
export type LogoutErrorResult = ErrorResult;
export type LogoutResult = (LogoutSuccessResult | LogoutErrorResult);
