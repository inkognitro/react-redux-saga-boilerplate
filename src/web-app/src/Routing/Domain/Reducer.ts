import { combineReducers, Reducer } from "redux";
import { homePageReducer } from "../SubModules/HomePage/Domain";
import { authPagesReducer } from "../SubModules/AuthPages/Domain";

export const routingReducer: Reducer = combineReducers({
    homePage: homePageReducer,
    authPages: authPagesReducer,
});
