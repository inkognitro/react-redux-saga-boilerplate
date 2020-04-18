"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Router/Types");
const initialRouterState = {
    redirects: [],
    routes: [],
};
function routerReducer(state = initialRouterState, event) {
    if (!event) {
        return state;
    }
    if (event.type === Types_1.RouterEventTypes.ROUTER_WAS_EXTENDED) {
        return Object.assign(Object.assign({}, state), { redirects: [
                ...state.redirects,
                ...event.payload.redirects,
            ], routes: [
                ...state.routes,
                ...event.payload.routes,
            ] });
    }
    return state;
}
exports.routerReducer = routerReducer;
//# sourceMappingURL=Reducer.js.map