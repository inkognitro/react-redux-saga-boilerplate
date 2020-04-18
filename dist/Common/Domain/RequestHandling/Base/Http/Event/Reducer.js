"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
const initialHttpState = {
    runningHttpRequests: [],
};
const eventTypesForRunningHttpRequestsRemoval = [
    Types_1.HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
    Types_1.HttpEventTypes.HTTP_REQUEST_FAILED,
    Types_1.HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
    Types_1.HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
];
function httpReducer(state = initialHttpState, event) {
    if (!event) {
        return state;
    }
    if (event.type === Types_1.HttpEventTypes.HTTP_REQUEST_WAS_SENT) {
        return Object.assign(Object.assign({}, state), { runningHttpRequests: [
                ...state.runningHttpRequests,
                event.payload.request,
            ] });
    }
    if (eventTypesForRunningHttpRequestsRemoval.includes(event.type)) {
        return Object.assign(Object.assign({}, state), { runningHttpRequests: state.runningHttpRequests.filter((request) => (request.id !== event.payload.request.id)) });
    }
    return state;
}
exports.httpReducer = httpReducer;
//# sourceMappingURL=Reducer.js.map