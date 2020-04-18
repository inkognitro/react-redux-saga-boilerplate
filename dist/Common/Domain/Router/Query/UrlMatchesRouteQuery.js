"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUrlMatchingRoute(url, route) {
    const urlSchemaParts = route.urlSchema.split('/');
    const urlParts = url.split('/');
    if (urlParts.slice(-1)[0] === '/') {
        urlParts.pop();
    }
    if (route.urlMustMatchExactly && urlSchemaParts.length !== urlParts.length) {
        return false;
    }
    if (urlSchemaParts.length > urlParts.length) {
        return false;
    }
    for (let index in urlParts) {
        const urlSchemaPart = urlSchemaParts[index];
        if (urlSchemaPart === undefined) {
            return true;
        }
        const urlPart = urlParts[index];
        if (urlSchemaPart.length === 0 && urlPart.length > 0) {
            return false;
        }
        if (urlSchemaPart.charAt(0) !== ':' && urlPart !== urlSchemaPart) {
            return false;
        }
    }
    return true;
}
exports.isUrlMatchingRoute = isUrlMatchingRoute;
//# sourceMappingURL=UrlMatchesRouteQuery.js.map