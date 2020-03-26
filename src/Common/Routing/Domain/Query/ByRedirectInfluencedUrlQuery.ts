import {RoutingState, RoutingStateSelector} from "Common/Routing/Domain/Types";
import {isUrlMatchingRoute} from "Common/Routing/Domain/Query/UrlMatchesRouteQuery";

function getByRedirectInfluencedUrl(state: RoutingState, url: string): string {
    let alreadyFoundRedirectUrls: string[] = [];
    let urlToGo = url;
    let foundRedirectUrl = findRedirectUrlForUrl(state, urlToGo);
    while(foundRedirectUrl !== null) {
        foundRedirectUrl = findRedirectUrlForUrl(state, urlToGo);
        if(foundRedirectUrl === null) {
            continue;
        }
        if(alreadyFoundRedirectUrls.includes(foundRedirectUrl)) {
            console.error(
                'Infinite redirect loop with url "' + urlToGo + '"!'
                + ' Returned base url "' + url + '" instead.'
            );
            return url;
        }
        alreadyFoundRedirectUrls.push(foundRedirectUrl);
    }
    return urlToGo;
}

function findRedirectUrlForUrl(state: RoutingState, url: string): (null | string) {
    for(let index in state.redirects) {
        const redirect = state.redirects[index];
        if(isUrlMatchingRoute(url, redirect.fromRoute)) {
            return redirect.toUrl;
        }
    }
    return null;
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