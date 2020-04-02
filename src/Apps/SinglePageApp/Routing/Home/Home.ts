import {RouteReducer} from "Common/Router/Domain/Event/Reducer";
import {homeRoute} from "SinglePageApp/Routing/Domain/Routes";
import {homeReducer} from "SinglePageApp/Routing/Home/Domain/Event/Reducer";
import {RouteComponent} from "Common/Router/UI/Router";
import {Home} from "SinglePageApp/Routing/Home/UI/Home";

export const homeRouteReducer: RouteReducer = {
    route: homeRoute,
    reducer: homeReducer,
};

export const homeRouteComponent: RouteComponent = {
    route: homeRoute,
    component: Home,
};