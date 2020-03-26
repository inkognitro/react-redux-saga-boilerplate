import {Event} from "Common/AppBase/EventBus";
import {CurrentUrlWasChanged} from "Common/Routing/Domain/Events/CurrentUrlWasChanged";
import {RedirectWasAdded} from "Common/Routing/Domain/Events/RedirectWasAdded";
import {Reducer} from "redux";

export type RoutingStateSelector = () => RoutingState;

export type RoutingState = {
    redirects: Redirect[],
    routes: Route[],
    currentRouteData: any,
};

export type Redirect = {
    fromRoute: Route,
    toUrl: string,
};

export type Route = {
    urlSchema: string,
    urlMustMatchExactly: boolean,
    reducer: Reducer
};

export enum RoutingEventTypes {
    CURRENT_URL_WAS_CHANGED = 'CURRENT_URL_WAS_CHANGED-6c0f7c81-d248-45a0-9813-187c90e42254',
    REDIRECT_WAS_ADDED = 'REDIRECT_WAS_ADDED-6c0f7c81-d248-45a0-9813-187c90e42254',
}

export type RoutingEvent = (CurrentUrlWasChanged | RedirectWasAdded | Event);