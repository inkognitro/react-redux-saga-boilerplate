import {CurrentUrlWasChanged} from "Common/Router/Domain/Event/CurrentUrlWasChanged";
import {RedirectsWereAdded} from "Common/Router/Domain/Event/RedirectsWereAdded";

export type RouterStateSelector<State = any> = (state: State) => RouterState

export type RouterState<CurrentRouteState = any> = {
    redirects: Redirect[],
    routes: Route[],
    currentRouteData: CurrentRouteState,
};

export type Redirect = {
    fromRoute: Route,
    toUrl: string,
};

export type Route = {
    urlSchema: string,
    urlMustMatchExactly: boolean,
};

export enum RouterEventTypes {
    CURRENT_URL_WAS_CHANGED = 'CURRENT_URL_WAS_CHANGED-6c0f7c81-d248-45a0-9813-187c90e42254',
    REDIRECTS_WERE_ADDED = 'REDIRECTS_WERE_ADDED-6c0f7c81-d248-45a0-9813-187c90e42254',
}

export type RouterEvent = (CurrentUrlWasChanged | RedirectsWereAdded);