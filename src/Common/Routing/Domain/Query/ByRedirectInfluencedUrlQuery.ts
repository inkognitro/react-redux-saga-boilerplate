import {RoutingState, RoutingStateSelector} from "Common/Routing/Domain/Types";
import {isUrlMatching} from "Common/Routing/Domain/Router";

export function getByRedirectInfluencedUrl(state: RoutingState, url: string): string {
    for(let index in state.redirects) {
        const redirect = state.redirects[index];
        if(isUrlMatching(redirect.fromRoute, redirect.toUrl)) {
            return redirect.toUrl;
        }
    }
    return url;
}

export class ByRedirectInfluencedUrlQuery {
    private readonly getRoutingState: RoutingStateSelector;

    constructor(getRoutingState: RoutingStateSelector) {
        this.getRoutingState = getRoutingState;
    }

    public get(url: string): string {
        return getByRedirectInfluencedUrl(this.getRoutingState(), url);
    }
}