import { combineReducers, Reducer } from "redux";
import { homePageReducer } from "../sub-modules/home-page/domain";
import { authPagesReducer } from "../sub-modules/auth-pages/domain";

export const routingReducer: Reducer = combineReducers({
    homePage: homePageReducer,
    authPages: authPagesReducer,
});
