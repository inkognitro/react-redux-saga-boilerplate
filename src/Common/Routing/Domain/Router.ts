import {Redirect, Route} from "Common/Routing/Domain/Types";
import {Action, Reducer} from "redux";
import {HistoryManager} from "Common/Routing/Domain/HistoryManager";
import {EventBus} from "Common/AppBase/EventBus";
import {createRedirectWasAdded} from "Common/Routing/Domain/Events/RedirectWasAdded";
import {createRouteWasAdded} from "Common/Routing/Domain/Events/RouteWasAdded";
import {createCurrentUrlWasChanged} from "Common/Routing/Domain/Events/CurrentUrlWasChanged";
import {ByRedirectInfluencedUrlQuery} from "Common/Routing/Domain/Query/ByRedirectInfluencedUrlQuery";
import {RouteByUrlQuery} from "Common/Routing/Domain/Query/RouteByUrlQuery";
import {CurrentRouteDataReducer} from "Common/Routing/Domain/Events/Reducer";

export class Router implements CurrentRouteDataReducer {
    private readonly eventBus: EventBus;
    private readonly byRedirectInfluencedUrlQuery: ByRedirectInfluencedUrlQuery;
    private readonly routeByUrlQuery: RouteByUrlQuery;
    private readonly historyManager: HistoryManager;
    private readonly defaultRouteDataReducer: Reducer;
    private readonly routeUrlSchemaToReducerMapping: {
        [urlSchema: string]: Reducer;
    };
    private currentRouteDataReducer: Reducer;

    constructor(
        eventBus: EventBus,
        byRedirectInfluencedUrlQuery: ByRedirectInfluencedUrlQuery,
        routeByUrlQuery: RouteByUrlQuery,
        historyManager: HistoryManager,
    ) {
        this.eventBus = eventBus;
        this.byRedirectInfluencedUrlQuery = byRedirectInfluencedUrlQuery;
        this.routeByUrlQuery = routeByUrlQuery;
        this.historyManager = historyManager;
        this.defaultRouteDataReducer = () => {};
        this.currentRouteDataReducer = this.defaultRouteDataReducer;
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
            this.setCurrentRouteDataReducer(urlToUse);
            this.eventBus.handle(createCurrentUrlWasChanged(urlToUse));
        }
    }

    private setCurrentRouteDataReducer(url: string): void
    {
        this.currentRouteDataReducer = this.getRouteReducerByUrl(url);
    }

    public reduce(state: (undefined | any), action: Action): Reducer
    {
        return this.currentRouteDataReducer(state, action);
    }

    private getRouteReducerByUrl(url: string): Reducer
    {
        const route = this.routeByUrlQuery.find(url);
        if(route && this.routeUrlSchemaToReducerMapping[route.urlSchema]) {
            return this.routeUrlSchemaToReducerMapping[route.urlSchema];
        }
        return this.defaultRouteDataReducer;
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