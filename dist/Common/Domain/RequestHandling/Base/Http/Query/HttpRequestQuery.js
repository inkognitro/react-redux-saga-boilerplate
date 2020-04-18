"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isHttpRequestRunningWithEnabledLoader(state) {
    const requestWithEnabledLoader = state.runningHttpRequests.find((request) => (request.isLoaderEnabled));
    return !!requestWithEnabledLoader;
}
exports.isHttpRequestRunningWithEnabledLoader = isHttpRequestRunningWithEnabledLoader;
function findRunningHttpRequestById(state, requestId) {
    for (let index in state.runningHttpRequests) {
        const request = state.runningHttpRequests[index];
        if (request.id === requestId) {
            return request;
        }
    }
    return null;
}
exports.findRunningHttpRequestById = findRunningHttpRequestById;
//# sourceMappingURL=HttpRequestQuery.js.map