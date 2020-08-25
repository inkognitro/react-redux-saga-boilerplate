import { HomePageState } from "../sub-modules/home-page/domain/types";
import { AuthPagesState } from "../sub-modules/auth-pages/domain";

export type RoutingState = {
    homePage: HomePageState
    authPages: AuthPagesState
};

export type RoutingStateSelector = (rootState: any) => RoutingState
