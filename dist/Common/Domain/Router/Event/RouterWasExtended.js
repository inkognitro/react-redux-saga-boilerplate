"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Router/Types");
function createRouterWasExtended(routes, redirects = []) {
    return {
        type: Types_1.RouterEventTypes.ROUTER_WAS_EXTENDED,
        payload: { routes, redirects }
    };
}
exports.createRouterWasExtended = createRouterWasExtended;
//# sourceMappingURL=RouterWasExtended.js.map