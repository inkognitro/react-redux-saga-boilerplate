import { ErrorResult, SuccessResult } from "packages/common/types/util/domain";
import { AuthenticatedAuthUser, AuthUser } from "packages/common/types/auth-user/domain";

export type AuthState = {
    isInitializationRunning: boolean
    isAuthenticationRunning: boolean
    currentUser: AuthUser
}

export type AuthStateSelector<State = any> = (state: State) => AuthState

export type LoginSettings = {
    username: string
    password: string
    shouldRemember: boolean
}

export type LoginSuccessResult = SuccessResult<{ authUser: AuthenticatedAuthUser }>
export type LoginErrorResult = ErrorResult
export type LoginResult = (LoginSuccessResult | LoginErrorResult)

export type LogoutSuccessResult = SuccessResult
export type LogoutErrorResult = ErrorResult
export type LogoutResult = (LogoutSuccessResult | LogoutErrorResult)

export type CurrentUserStorage = {
    saveCurrentUser(user: AuthenticatedAuthUser): void
    findCurrentUser(): (null | AuthenticatedAuthUser)
    removeCurrentUser(): void
}
