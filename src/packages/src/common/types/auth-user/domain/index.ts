import {
    AuthUser as AuthUserType,
    AuthenticatedAuthUser as AuthenticatedAuthUserType,
    AnonymousAuthUser as AnonymousAuthUserType,
} from './types';

export type AuthUser = AuthUserType;
export type AuthenticatedAuthUser = AuthenticatedAuthUserType;
export type AnonymousAuthUser = AnonymousAuthUserType;

export { AuthUserTypes } from './types';
