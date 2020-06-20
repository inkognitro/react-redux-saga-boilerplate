import {
    AuthUser as AuthUserType,
    AuthenticatedAuthUser as AuthenticatedAuthUserType,
    AnonymousAuthUser as AnonymousAuthUserType,
} from "./Types";

export type AuthUser = AuthUserType;
export type AuthenticatedAuthUser = AuthenticatedAuthUserType;
export type AnonymousAuthUser = AnonymousAuthUserType;

export { AuthUserTypes } from './Types';
