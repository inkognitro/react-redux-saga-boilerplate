import {RouteHistoryInterface} from "Common/Routing/Domain/CurrentRouteManager";
import {createBrowserHistory, History} from 'history';
import LocationState = History.LocationState;

export class BrowserRouteHistory implements RouteHistoryInterface{
    private readonly history: History<LocationState>;

    constructor() {
        this.history = createBrowserHistory();
    }

    setCurrentRouteUrl(routeUrl: string): void {
        this.history.push(routeUrl);
    }
}