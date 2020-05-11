import { HomePageState } from "SinglePageApp/Domain/Routing/HomePage/Types";
import { LoginPageState } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Types";

export type RoutingState = {
  homePage: HomePageState
  loginPage: LoginPageState
};
