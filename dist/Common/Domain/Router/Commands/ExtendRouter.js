"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Router/Types");
function createAddRedirects(routes, redirects) {
    return {
        type: Types_1.RouterCommandTypes.EXTEND_ROUTER,
        payload: { routes, redirects }
    };
}
exports.createAddRedirects = createAddRedirects;
//# sourceMappingURL=ExtendRouter.js.map