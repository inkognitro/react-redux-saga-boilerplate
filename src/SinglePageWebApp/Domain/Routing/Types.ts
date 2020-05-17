import { HomePageState } from "SinglePageWebApp/Domain/Routing/HomePage/Types";
import {AuthPagesState} from "SinglePageWebApp/Domain/Routing/AuthPages/Types";

export type RoutingState = {
  homePage: HomePageState
  authPages: AuthPagesState
};
