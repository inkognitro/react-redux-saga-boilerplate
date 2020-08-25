import {
    AuthPagesState as AuthPagesStateType,
    AuthPagesStateSelector as AuthPagesStateSelectorType,
} from './types';

export type AuthPagesState = AuthPagesStateType;
export type AuthPagesStateSelector = AuthPagesStateSelectorType;

export { createAuthPagesSaga } from './saga/flow';
export { authPagesReducer } from './reducer';
export { loginRoute } from '../sub-modules/login-page/domain';
