import {
    AuthPagesState as AuthPagesStateType,
    AuthPagesStateSelector as AuthPagesStateSelectorType,
} from './Types';

export type AuthPagesState = AuthPagesStateType;
export type AuthPagesStateSelector = AuthPagesStateSelectorType;

export { createAuthPagesSaga } from './Saga/Flow';
export { authPagesReducer } from './Reducer';
export { loginRoute } from '../SubModules/LoginPage/Domain';
