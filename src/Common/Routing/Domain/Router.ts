import {Redirect, Route} from "Common/Routing/Domain/Types";
import {Reducer, Store} from "redux";
import {HistoryManager} from "Common/Routing/Domain/HistoryManager";
import {EventBus} from "Common/AppBase/EventBus";
import {createRedirectWasAdded} from "Common/Routing/Domain/Events/RedirectWasAdded";
import {createRouteWasAdded} from "Common/Routing/Domain/Events/RouteWasAdded";
import {createUrlWasChanged} from "Common/Routing/Domain/Events/UrlWasChanged";
import {ByRedirectInfluencedUrlQuery} from "Common/Routing/Domain/Query/ByRedirectInfluencedUrlQuery";
import {RouteByUrlQuery} from "Common/Routing/Domain/Query/RouteByUrlQuery";

export class Router {
    private readonly store: Store;
    private readonly eventBus: EventBus;
    private readonly byRedirectInfluencedUrlQuery: ByRedirectInfluencedUrlQuery;
    private readonly routeByUrlQuery: RouteByUrlQuery;
    private readonly historyManager: HistoryManager;
    private readonly defaultReducer: Reducer;
    private readonly routeUrlSchemaToReducerMapping: {
        [urlSchema: string]: Reducer;
    };

    constructor(
        store: Store,
        eventBus: EventBus,
        byRedirectInfluencedUrlQuery: ByRedirectInfluencedUrlQuery,
        routeByUrlQuery: RouteByUrlQuery,
        historyManager: HistoryManager,
    ) {
        this.store = store;
        this.eventBus = eventBus;
        this.byRedirectInfluencedUrlQuery = byRedirectInfluencedUrlQuery;
        this.routeByUrlQuery = routeByUrlQuery;
        this.historyManager = historyManager;
        this.defaultReducer = () => null;
        this.routeUrlSchemaToReducerMapping = {};
        this.setOnChangeUrlCallback();
    }

    private setOnChangeUrlCallback(): void {
        const mustTriggerHistoryManager = false;
        const onChangeUrlCallback = (url: string) => this.openUrl({
            url: url,
            target: '_self',
            shouldReplaceCurrentUrl: false
        }, mustTriggerHistoryManager);
        this.historyManager.setOnChangeUrlCallback(onChangeUrlCallback);
    }

    public openUrl(settings: OpenUrlSettings, mustTriggerHistoryManager: boolean = true): void
    {
        const urlToUse = this.byRedirectInfluencedUrlQuery.get(settings.url);
        const target = (!settings.target ? '_self' : settings.target);
        if(mustTriggerHistoryManager && target === '_self') {
            this.historyManager.changeCurrentUrl(urlToUse, !!settings.shouldReplaceCurrentUrl);
        }
        if(mustTriggerHistoryManager && target !== '_self') {
            this.historyManager.openUrlInTarget(urlToUse, target);
        }
        if(target === '_self') { //todo: should reducer be replaced before url change!?
            this.setCurrentRouteReducer(urlToUse);
            this.eventBus.handle(createUrlWasChanged(urlToUse));
        }
    }

    private setCurrentRouteReducer(url: string): void
    {
        const reducer = this.getRouteReducerByUrl(url);
        //todo replace reducers!
    }

    private getRouteReducerByUrl(url: string): Reducer
    {
        const route = this.routeByUrlQuery.find(url);
        if(route && this.routeUrlSchemaToReducerMapping[route.urlSchema]) {
            return this.routeUrlSchemaToReducerMapping[route.urlSchema];
        }
        return this.defaultReducer;
    }

    public addRedirect(redirect: Redirect): void
    {
        this.eventBus.handle(createRedirectWasAdded(redirect));
    }

    public addRoute(settings: AddRouteSettings): void
    {
        this.addRouteReducer(settings);
        this.eventBus.handle(createRouteWasAdded(settings.route));
    }

    private addRouteReducer(settings: AddRouteSettings): void
    {
        this.routeUrlSchemaToReducerMapping[settings.route.urlSchema] = settings.reducer;
    }
}

export function isUrlMatching(route: Route, url: string): boolean {
    const urlSchemaParts = route.urlSchema.split('/');
    const urlParts = url.split('/');
    if(route.urlMustMatchExactly && urlSchemaParts.length !== urlParts.length) {
        return false;
    }
    if(urlSchemaParts.length > urlParts.length) {
        return false;
    }
    for(let index in urlParts) {
        const urlSchemaPart = urlSchemaParts[index];
        if(urlSchemaPart === undefined) {
            return true;
        }
        const urlPart = urlParts[index];
        if(urlSchemaPart.length === 0 && urlPart.length > 0) {
            return false;
        }
        if(urlSchemaPart.charAt(0) !== ':' && urlPart !== urlSchemaPart) {
            return false;
        }
    }
    return true;
}

export type AddRouteSettings = {
    route: Route,
    reducer: Reducer
};

export type OpenUrlSettings = {
    url: string,
    target?: string,
    shouldReplaceCurrentUrl?: boolean,
};