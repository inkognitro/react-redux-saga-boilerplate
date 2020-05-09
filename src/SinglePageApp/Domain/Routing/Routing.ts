import { combineReducers, Reducer } from "redux";
import { spawn } from "redux-saga/effects";
import { loginPageReducer } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Reducer";
import { homePageReducer } from "./HomePage/Reducer";
import { createHomePageSaga } from "./HomePage/HomePage";

export function createRoutingSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(createHomePageSaga());
    };
}

export const routingReducer: Reducer = combineReducers({
    homePage: homePageReducer,
    loginPage: loginPageReducer,
});
