import {
    RouterState as RouterStateType,
    Route as RouteType,
    Redirect as RedirectType,
    RouterStateSelector as RouterStateSelectorType,
    HistoryManager as HistoryManagerType,
} from './types';
import { OpenUrl as OpenUrlType } from "./command";
import {
    CurrentUrlWasChanged as CurrentUrlWasChangedType,
    RouterWasExtended as RouterWasExtendedType,
    RouterWasInitialized as RouterWasInitializedType,
} from "./event";

export type CurrentUrlWasChanged = CurrentUrlWasChangedType;
export type RouterState = RouterStateType;
export type Route = RouteType;
export type Redirect = RedirectType;
export type RouterStateSelector = RouterStateSelectorType;
export type OpenUrl = OpenUrlType;
export type RouterWasExtended = RouterWasExtendedType;
export type RouterWasInitialized = RouterWasInitializedType;
export type HistoryManager = HistoryManagerType;

export { createRouterSaga } from './saga/flow';
export { routerReducer } from './reducer';
export { RouterCommandTypes } from "packages/common/router/domain/command";
export { createOpenUrl } from "packages/common/router/domain/command";
export { RouterEventTypes } from "packages/common/router/domain/event";
