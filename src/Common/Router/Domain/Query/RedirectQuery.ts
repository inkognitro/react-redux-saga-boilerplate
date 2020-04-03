import {Redirect, Route, RouterState} from "Common/Router/Domain/Types";

export function findRedirectByExactRoute(state: RouterState, route: Route): (null | Redirect) {
    for(let index in state.redirects) {
        const redirect = state.redirects[index];
        if(
            redirect.fromRoute.urlSchema === route.urlSchema
            && redirect.fromRoute.urlMustMatchExactly === route.urlMustMatchExactly
        ) {
            return redirect;
        }
    }
    return null;
}