import {RouterState} from "Common/Router/Domain/Types";
import {isUrlMatchingRoute} from "Common/Router/Domain/Query/UrlMatchesRouteQuery";

export function getByRedirectInfluencedUrl(state: RouterState, url: string): string {
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

function findRedirectUrlForUrl(state: RouterState, url: string): (null | string) {
    for(let index in state.redirects) {
        const redirect = state.redirects[index];
        if(isUrlMatchingRoute(url, redirect.fromRoute)) {
            return redirect.toUrl;
        }
    }
    return null;
}