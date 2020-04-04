import {HttpRequest, RequestHandlerState} from "Common/RequestHandler/Domain/Types";

export function isHttpRequestRunningWithEnabledLoader(state: RequestHandlerState): boolean { //todo: use reselect library!
    const requestWithEnabledLoader = state.runningHttpRequests.find((request) => (request.isLoaderEnabled));
    return !!requestWithEnabledLoader;
}

export function findRunningHttpRequestById(state: RequestHandlerState, requestId: string): (null | HttpRequest) {
    for (let index in state.runningHttpRequests) {
        const request = state.runningHttpRequests[index];
        if (request.id === requestId) {
            return request;
        }
    }
    return null;
}