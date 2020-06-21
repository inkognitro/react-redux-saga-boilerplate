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
export { ConnectedLoginPageWC } from './UI/LoginPageWC';

export const loginRoute: Route = {
    urlSchema: "/auth/login",
    urlMustMatchExactly: true,
};
export {LoginPageCommandTypes} from "WebApp/Routing/SubModules/LoginPage/Domain/Command/Types";
