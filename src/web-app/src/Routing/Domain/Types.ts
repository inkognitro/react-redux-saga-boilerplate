import { HomePageState } from "../SubModules/HomePage/Domain/Types";
import { AuthPagesState } from "../SubModules/AuthPages/Domain";

export type RoutingState = {
    homePage: HomePageState
    authPages: AuthPagesState
};

export type RoutingStateSelector = (rootState: any) => RoutingState
