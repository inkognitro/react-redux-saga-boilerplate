"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findRedirectByExactRoute(state, route) {
    for (let index in state.redirects) {
        const redirect = state.redirects[index];
        if (redirect.fromRoute.urlSchema === route.urlSchema
            && redirect.fromRoute.urlMustMatchExactly === route.urlMustMatchExactly) {
            return redirect;
        }
    }
    return null;
}
exports.findRedirectByExactRoute = findRedirectByExactRoute;
//# sourceMappingURL=RedirectQuery.js.map