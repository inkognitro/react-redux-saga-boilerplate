import {RoutingState} from "Common/Routing/Domain/Types";
import {AppDispatch} from "Common/types";
import {getCurrentRouteState} from "Common/Routing/Domain/Selectors";
import {createSetCurrentRouteStateAction, createApplyCurrentRouteStateChangesAction} from "Common/Routing/Domain/ActionCreation";
import {History} from 'history';

export interface CurrentRouteManagerInterface {
    getHistory(): History
    setCurrentRouteUrl(url: string): void
    setCurrentRouteState(state: object, callback?: () => void): void
    applyCurrentRouteStateChanges(stateChanges: object, callback?: () => void): void
    getCurrentRouteState(): object
}

export class CurrentRouteManager implements CurrentRouteManagerInterface {
    private readonly dispatch: AppDispatch;
    private readonly getRoutingState: RoutingStateSelector;
    private readonly routeHistoryManager: RouteHistoryManagerInterface;

    constructor(
        dispatch: AppDispatch,
        getRoutingState: RoutingStateSelector,
        routeHistoryManager: RouteHistoryManagerInterface
    ) {
        this.dispatch = dispatch;
        this.getRoutingState = getRoutingState;
        this.routeHistoryManager = routeHistoryManager;
        this.routeHistoryManager.setOnChangeCurrentRouteUrl((routeUrl) => this.setCurrentRouteUrl(routeUrl));
    }

    public getHistory(): History {
        return this.routeHistoryManager.getHistory();
    }

    public setCurrentRouteUrl(url: string): void
    {
        if(this.routeHistoryManager.getCurrentRouteUrl() === url) {
            return;
        }
        this.routeHistoryManager.setCurrentRouteUrl(url);
    }

    public setCurrentRouteState(state: object, callback?: () => void): void
    {
        this.dispatch(createSetCurrentRouteStateAction(state));
        if(callback) {
            callback();
        }
    }

    public applyCurrentRouteStateChanges(stateChanges: object, callback?: () => void): void
    {
        this.dispatch(createApplyCurrentRouteStateChangesAction(stateChanges));
        if(callback) {
            callback();
        }
    }

    public getCurrentRouteState(): object {
        return getCurrentRouteState(this.getRoutingState());
    }

    /*
    private isUrlMatching(urlSpecification: UrlSpecification, url: string): boolean {
        const specificationUrlParts = urlSpecification.url.split('/');
        const urlParts = url.split('/');
        if(urlSpecification.shouldMatchExactly && specificationUrlParts.length !== urlParts.length) {
            return false;
        }
        for(let index in urlParts) {
            const urlSpecificationPart = urlParts[index];
            if(urlSpecificationPart === undefined) {
                return false;
            }
            const urlPart = urlParts[index];
            if(urlSpecificationPart.length === 0 && urlPart.length > 0) {
                return false;
            }
            if(urlSpecificationPart.charAt(0) !== ':' && urlPart !== urlSpecificationPart) {
                return false;
            }
        }
        return true;
    }
    */
}

export interface RouteHistoryManagerInterface {
    getHistory(): History
    getCurrentRouteUrl(): string
    setCurrentRouteUrl(routeUrl: string): void
    setOnChangeCurrentRouteUrl(onChangeCurrentRouteUrl: (routeUrl: string) => void): void
}

export type UrlSpecification = {
    url: string,
    shouldMatchExactly: boolean,
    initialState: object
};

type RoutingStateSelector = () => RoutingState;