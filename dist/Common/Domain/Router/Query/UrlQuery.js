"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UrlMatchesRouteQuery_1 = require("Common/Domain/Router/Query/UrlMatchesRouteQuery");
function getByRedirectInfluencedUrl(state, url) {
    let alreadyFoundRedirectUrls = [];
    let urlToGo = url;
    let foundRedirectUrl = findRedirectUrlForUrl(state, urlToGo);
    while (foundRedirectUrl !== null) {
        foundRedirectUrl = findRedirectUrlForUrl(state, urlToGo);
        if (foundRedirectUrl === null) {
            continue;
        }
        if (alreadyFoundRedirectUrls.includes(foundRedirectUrl)) {
            console.error('Infinite redirect loop with url "' + urlToGo + '"!'
                + ' Returned base url "' + url + '" instead.');
            return url;
        }
        alreadyFoundRedirectUrls.push(foundRedirectUrl);
    }
    return urlToGo;
}
exports.getByRedirectInfluencedUrl = getByRedirectInfluencedUrl;
function findRedirectUrlForUrl(state, url) {
    for (let index in state.redirects) {
        const redirect = state.redirects[index];
        if (UrlMatchesRouteQuery_1.isUrlMatchingRoute(url, redirect.fromRoute)) {
            return redirect.toUrl;
        }
    }
    return null;
}
//# sourceMappingURL=UrlQuery.js.map