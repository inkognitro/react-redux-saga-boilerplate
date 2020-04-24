import { RouterEventTypes } from "Common/Domain/Router/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createRouterWasInitialized(url: string): RouterWasInitialized {
    return {
        type: RouterEventTypes.ROUTER_WAS_INITIALIZED,
        payload: {
            url,
        },
    };
}

export type RouterWasInitialized = Event<
  RouterEventTypes.ROUTER_WAS_INITIALIZED,
  {
    url: string;
  }
>;
