import { combineReducers, Reducer } from "redux";
import { loginPageReducer } from "../SubModules/LoginPage/Domain";

export const authPagesReducer: Reducer = combineReducers({
    loginPage: loginPageReducer,
});
