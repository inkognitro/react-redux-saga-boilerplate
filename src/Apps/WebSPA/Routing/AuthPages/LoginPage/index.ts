import { Route } from "Packages/Common/Router/Domain/Types";

export { createLogin, Login } from './Domain/Command/Login';
export { createLoginPageSaga } from './Domain/Saga/Flow';
export { loginPageReducer } from './Domain/Reducer';
export * from './Domain/Types';
export * from './UI/LoginPageWC';

export const loginRoute: Route = {
    urlSchema: "/auth/login",
    urlMustMatchExactly: true,
};
