import { User } from "Packages/Entity/User";

export enum AuthUserTypes {
    ANONYMOUS = 'anonymous',
    AUTHENTICATED_USER = 'authenticatedUser'
}

type AuthUserBase<Type extends AuthUserTypes, Data = {}> = ({ type: Type } & Data)

export type AnonymousAuthUser = AuthUserBase<AuthUserTypes.ANONYMOUS>

export type AuthenticatedAuthUser = AuthUserBase<AuthUserTypes.AUTHENTICATED_USER, {
    token: string
    user: User
}>

export type AuthUser = (AnonymousAuthUser | AuthenticatedAuthUser)
