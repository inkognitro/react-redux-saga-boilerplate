import { RouteComponent } from "Packages/Common/UI/Web/Router/Router";
import { loginRoute } from "Apps/WebSPA/Domain/Routing/Routes";
import { LoginPage } from "Apps/WebSPA/UI/Routing/AuthPages/LoginPage/LoginPage";

export const authRouteComponents: RouteComponent[] = [
    { route: loginRoute, component: LoginPage },
];
