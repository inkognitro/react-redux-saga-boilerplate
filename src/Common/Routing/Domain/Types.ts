import {UrlWasChanged} from "Common/Routing/Domain/Events/UrlWasChanged";

export type RoutingStateSelector = () => RoutingState;

export type RoutingState = {
    redirects: Redirect[],
    routes: Route[],
};

export type Redirect = {
    fromRoute: Route,
    toUrl: string,
};

export type Route = {
    urlSchema: string,
    urlMustMatchExactly: boolean,
    userMustBeAuthenticated: boolean,
};

export enum RoutingEventTypes {
    URL_WAS_CHANGED = 'URL_WAS_CHANGED-6c0f7c81-d248-45a0-9813-187c90e42254',
    REDIRECT_WAS_ADDED = 'REDIRECT_WAS_ADDED-6c0f7c81-d248-45a0-9813-187c90e42254',
    ROUTE_WAS_ADDED = 'ROUTE_WAS_ADDED-6c0f7c81-d248-45a0-9813-187c90e42254',
}

export type RoutingEvent = (UrlWasChanged);