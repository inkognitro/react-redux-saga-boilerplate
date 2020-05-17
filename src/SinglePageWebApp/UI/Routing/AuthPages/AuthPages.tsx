import { RouteComponent } from "Packages/Common/UI/Web/Router/Router";
import { loginRoute } from "SinglePageWebApp/Domain/Routing/Routes";
import { LoginPage } from "SinglePageWebApp/UI/Routing/AuthPages/LoginPage/LoginPage";

export const authRouteComponents: RouteComponent[] = [
    { route: loginRoute, component: LoginPage },
];
