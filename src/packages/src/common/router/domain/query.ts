import { Redirect, Route, RouterState } from "./types";

export function getByRedirectInfluencedUrl(
    state: RouterState,
    url: string,
): string {
    const alreadyFoundRedirectUrls: string[] = [];
    const urlToGo = url;
    let foundRedirectUrl = findRedirectUrlForUrl(state, urlToGo);
    while (foundRedirectUrl !== null) {
        foundRedirectUrl = findRedirectUrlForUrl(state, urlToGo);
        if (foundRedirectUrl === null) {
            continue;
        }
        if (alreadyFoundRedirectUrls.includes(foundRedirectUrl)) {
            console.error(
                `Infinite redirect loop with url "${urlToGo}"!`
                + ` Returned base url "${url}" instead.`,
            );
            return url;
        }
        alreadyFoundRedirectUrls.push(foundRedirectUrl);
    }
    return urlToGo;
}

export function isUrlMatchingRoute(url: string, route: Route): boolean {
    const urlSchemaParts = route.urlSchema.split("/");
    const urlParts = url.split("/");
    if (urlParts.slice(-1)[0] === "/") {
        urlParts.pop();
    }

    if (route.urlMustMatchExactly && urlSchemaParts.length !== urlParts.length) {
        return false;
    }

    if (urlSchemaParts.length > urlParts.length) {
        return false;
    }

    for (const index in urlParts) {
        const urlSchemaPart = urlSchemaParts[index];
        if (urlSchemaPart === undefined) {
            return true;
        }
        const urlPart = urlParts[index];
        if (urlSchemaPart.length === 0 && urlPart.length > 0) {
            return false;
        }
        if (urlSchemaPart.charAt(0) !== ":" && urlPart !== urlSchemaPart) {
            return false;
        }
    }
    return true;
}

function findRedirectUrlForUrl(state: RouterState, url: string): null | string {
    for (const index in state.redirects) {
        const redirect = state.redirects[index];
        if (isUrlMatchingRoute(url, redirect.fromRoute)) {
            return redirect.toUrl;
        }
    }
    return null;
}

export function findRedirectByExactRoute(
    state: RouterState,
    route: Route,
): null | Redirect {
    for (const index in state.redirects) {
        const redirect = state.redirects[index];
        if (
            redirect.fromRoute.urlSchema === route.urlSchema
            && redirect.fromRoute.urlMustMatchExactly === route.urlMustMatchExactly
        ) {
            return redirect;
        }
    }
    return null;
}
