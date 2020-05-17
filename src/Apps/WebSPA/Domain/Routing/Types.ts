import { HomePageState } from "Apps/WebSPA/Domain/Routing/HomePage/Types";
import {AuthPagesState} from "Apps/WebSPA/Domain/Routing/AuthPages/Types";

export type RoutingState = {
  homePage: HomePageState
  authPages: AuthPagesState
};
