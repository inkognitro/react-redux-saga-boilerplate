import { RouterSpecification } from "packages/common/router/ui/web";
import { homeRoute } from "../SubModules/HomePage/Domain";
import { HomePageWC } from "../SubModules/HomePage/UI";
import { NotFoundWC } from "../SubModules/NotFoundPage/UI";
import { authRouteComponents } from "../SubModules/AuthPages/UI";

export const specification: RouterSpecification = {
    routeComponents: [
        { route: homeRoute, component: HomePageWC },
        ...authRouteComponents,
    ],
    defaultComponent: NotFoundWC,
};
