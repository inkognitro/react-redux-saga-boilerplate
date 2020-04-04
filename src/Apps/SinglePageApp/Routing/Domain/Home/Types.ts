import {RouteReducer} from "Common/Router/Domain/Event/Reducer";
import {homeRoute} from "SinglePageApp/Routing/Domain/Routes";
import {homeReducer} from "SinglePageApp/Routing/Domain/Home/Event/Reducer";

export type HomeState = {
    foo: string,
};
export const homeRouteReducer: RouteReducer = {
    route: homeRoute,
    reducer: homeReducer,
};