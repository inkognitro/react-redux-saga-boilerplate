import { Route } from "Packages/Common/Router/Domain";
import { Login as LoginType } from './Domain/Command/Login';
import {
    LoginPageState as LoginPageStateType,
    LoginPageStateSelector as LoginPageStateSelectorType,
} from './Domain/Types';

export type Login = LoginType;
export type LoginPageState = LoginPageStateType;
export type LoginPageStateSelector = LoginPageStateSelectorType;

export { createLogin } from './Domain/Command/Login';
export { createLoginPageSaga } from './Domain/Saga/Flow';
export { loginPageReducer } from './Domain/Reducer';
export { LoginPageCommandTypes } from './Domain/Types';
export { LoginPageWC } from './UI/LoginPageWC';

export const loginRoute: Route = {
    urlSchema: "/auth/login",
    urlMustMatchExactly: true,
};
