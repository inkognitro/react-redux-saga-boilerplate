import {
    AuthUser as AuthUserType,
    AnonymousAuthUser as AnonymousAuthUserType,
    AuthenticatedAuthUser as AuthenticatedAuthUserType,
} from "./Domain/Types";
import { AuthUserLabelWCProps as AuthUserLabelWCPropsType } from './UI/AuthUserLabelWC';

export type AuthUserLabelWCProps = AuthUserLabelWCPropsType;
export type AuthUser = AuthUserType;
export type AnonymousAuthUser = AnonymousAuthUserType;
export type AuthenticatedAuthUser = AuthenticatedAuthUserType;
export { AuthUserTypes } from './Domain/Types';
export { AuthUserLabelWC } from './UI/AuthUserLabelWC';
