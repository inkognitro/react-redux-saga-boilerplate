import {RouteHistoryManagerInterface} from "Common/Routing/Domain/CurrentRouteManager";
import {createBrowserHistory, History, LocationState} from 'history';

export class BrowserRouteHistoryManager implements RouteHistoryManagerInterface{
    private readonly history: History<LocationState>;

    constructor() {
        this.history = createBrowserHistory();
    }

    getHistory(): History {
        return this.history;
    }

    getCurrentRouteUrl(): string {
        return this.history.location.pathname;
    }

    setCurrentRouteUrl(routeUrl: string): void {
        this.history.push(routeUrl);
    }

    setOnChangeCurrentRouteUrl(onChangeCurrentRouteUrl: (routeUrl: string) => void): void {
        this.history.listen((location) => onChangeCurrentRouteUrl(location.pathname));
    }
}