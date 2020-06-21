import { RouterWCSpecification } from "Packages/Common/Router/Web";
import { homeRoute } from "../SubModules/HomePage/Domain";
import { HomePageWC } from "../SubModules/HomePage/UI";
import { NotFoundWC } from "../SubModules/NotFoundPage/UI";
import { authRouteComponents } from "../SubModules/AuthPages/UI";

export const specification: RouterWCSpecification = {
    routeComponents: [
        { route: homeRoute, component: HomePageWC },
        ...authRouteComponents,
    ],
    defaultComponent: NotFoundWC,
};
