import { RouteComponentSpecification } from "packages/common/router/ui/web";
import { ConnectedLoginPageWC } from "../sub-modules/login-page/ui";
import { loginRoute } from "../sub-modules/login-page/domain";

export const authRouteComponents: RouteComponentSpecification[] = [
    { route: loginRoute, component: ConnectedLoginPageWC },
];
