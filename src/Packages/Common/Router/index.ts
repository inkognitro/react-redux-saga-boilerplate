import { CurrentUrlWasChanged as CurrentUrlWasChangedType } from './Domain/Event/CurrentUrlWasChanged';
import {
    RouterState as RouterStateType,
    Route as RouteType,
    Redirect as RedirectType,
    RouterEvent as RouterEventType,
    RouterStateSelector as RouterStateSelectorType,
} from './Domain/Types';
import { OpenUrl as OpenUrlType } from './Domain/Command/OpenUrl';
import { RouterWasExtended as RouterWasExtendedType } from './Domain/Event/RouterWasExtended';
import { RouterWasInitialized as RouterWasInitializedType } from './Domain/Event/RouterWasInitialized';
import {
    RouterWCSpecification as RouterWCSpecificationType,
    RouteComponentSpecification as RouteComponentSpecificationType,
} from './UI/RouterWC';

export type CurrentUrlWasChanged = CurrentUrlWasChangedType;
export type RouterState = RouterStateType;
export type Route = RouteType;
export type Redirect = RedirectType;
export type RouterEvent = RouterEventType;
export type RouterStateSelector = RouterStateSelectorType;
export type OpenUrl = OpenUrlType;
export type RouterWasExtended = RouterWasExtendedType;
export type RouterWasInitialized = RouterWasInitializedType;
export type RouterWCSpecification = RouterWCSpecificationType;
export type RouteComponentSpecification = RouteComponentSpecificationType;

export interface HistoryManager {
    getCurrentUrl(): string
    openUrlInOtherTarget(url: string, target: string): void
    changeCurrentUrl(url: string, replaceCurrentUrl: boolean): void
    getOnChangeCurrentUrlPromise(): Promise<string>
}

export { RouterEventTypes, RouterCommandTypes } from './Domain/Types';
export { createRouterSaga } from './Domain/Saga/Flow';
export { createOpenUrl } from './Domain/Command/OpenUrl';
export { routerReducer } from './Domain/Reducer';
export { BrowserHistoryManager } from './Infrastructure/BrowserHistoryManager';
export { RouteLinkWC, FunctionalLinkWC } from './UI/LinkWC';
export { RouterWC } from './UI/RouterWC';
