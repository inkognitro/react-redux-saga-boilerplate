import { RouteComponentSpecification } from "packages/common/router/ui/web";
import { ConnectedLoginPageWC } from "../SubModules/LoginPage/UI";
import { loginRoute } from "../SubModules/LoginPage/Domain";

export const authRouteComponents: RouteComponentSpecification[] = [
    { route: loginRoute, component: ConnectedLoginPageWC },
];
