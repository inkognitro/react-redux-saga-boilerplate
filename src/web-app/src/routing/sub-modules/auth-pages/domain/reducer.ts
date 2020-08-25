import { combineReducers, Reducer } from "redux";
import { loginPageReducer } from "../sub-modules/login-page/domain";

export const authPagesReducer: Reducer = combineReducers({
    loginPage: loginPageReducer,
});
