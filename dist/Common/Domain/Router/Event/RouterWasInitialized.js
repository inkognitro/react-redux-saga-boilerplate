"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Router/Types");
function createRouterWasInitialized(url) {
    return {
        type: Types_1.RouterEventTypes.ROUTER_WAS_INITIALIZED,
        payload: {
            url: url,
        }
    };
}
exports.createRouterWasInitialized = createRouterWasInitialized;
//# sourceMappingURL=RouterWasInitialized.js.map