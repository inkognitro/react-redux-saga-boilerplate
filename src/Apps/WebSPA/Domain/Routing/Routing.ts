import { combineReducers, Reducer } from "redux";
import { spawn } from "redux-saga/effects";
import { authPagesReducer, createAuthPagesSaga } from "./AuthPages/AuthPages";
import { homePageReducer } from "./HomePage/Reducer";
import { createHomePageSaga } from "./HomePage/HomePage";

export function createRoutingSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(createHomePageSaga());
        yield spawn(createAuthPagesSaga());
    };
}

export const routingReducer: Reducer = combineReducers({
    homePage: homePageReducer,
    authPages: authPagesReducer,
});
