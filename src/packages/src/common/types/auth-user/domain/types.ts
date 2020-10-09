import { User } from "packages/common/types/user/domain";

export enum AuthUserTypes {
    ANONYMOUS = 'anonymous',
    AUTHENTICATED_USER = 'authenticatedUser'
}

type AuthUserBase<Type extends AuthUserTypes, Data = {}> = ({ type: Type } & Data)

export type AnonymousAuthUser = AuthUserBase<AuthUserTypes.ANONYMOUS>

export type AuthenticatedAuthUser = AuthUserBase<AuthUserTypes.AUTHENTICATED_USER, {
    token: string
    user: User
    shouldRemember: boolean
}>

export type AuthUser = (AnonymousAuthUser | AuthenticatedAuthUser)
