import { HomePageState } from "SinglePageApp/Domain/Routing/HomePage/Types";
import {AuthPagesState} from "SinglePageApp/Domain/Routing/AuthPages/Types";

export type RoutingState = {
  homePage: HomePageState
  authPages: AuthPagesState
};
