import { CurrentUrlWasChanged } from "Packages/Common/Domain/Router/Event/CurrentUrlWasChanged";
import { RouterWasExtended } from "Packages/Common/Domain/Router/Event/RouterWasExtended";
import { RouterWasInitialized } from "Packages/Common/Domain/Router/Event/RouterWasInitialized";

export type RouterState = {
  redirects: Redirect[];
  routes: Route[];
};

export type Redirect = {
  fromRoute: Route;
  toUrl: string;
};

export type Route = {
  urlSchema: string;
  urlMustMatchExactly: boolean;
};

export enum RouterEventTypes {
  ROUTER_WAS_INITIALIZED = "ROUTER_WAS_INITIALIZED-6c0f7c81-d248-45a0-9813-187c90e42254",
  CURRENT_URL_WAS_CHANGED = "CURRENT_URL_WAS_CHANGED-6c0f7c81-d248-45a0-9813-187c90e42254",
  ROUTER_WAS_EXTENDED = "ROUTER_WAS_EXTENDED-6c0f7c81-d248-45a0-9813-187c90e42254",
}

export type RouterStateSelector<State = any> = (state: State) => RouterState;

export type RouterEvent =
  | RouterWasInitialized
  | CurrentUrlWasChanged
  | RouterWasExtended;

export enum RouterCommandTypes {
  OPEN_URL = "OPEN_URL-33ca8d0f-20f8-439e-b34f-fdd6859316c4",
  EXTEND_ROUTER = "EXTEND_ROUTER-33ca8d0f-20f8-439e-b34f-fdd6859316c4",
}
