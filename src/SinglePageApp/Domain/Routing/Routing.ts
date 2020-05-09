import { combineReducers, Reducer } from "redux";
import { spawn } from "redux-saga/effects";
import { homeReducer } from "./Home/Reducer";
import { createHomeSaga } from "./Home/Home";

export function createRoutingSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(createHomeSaga());
    };
}

export const routingReducer: Reducer = combineReducers({
    home: homeReducer,
});
