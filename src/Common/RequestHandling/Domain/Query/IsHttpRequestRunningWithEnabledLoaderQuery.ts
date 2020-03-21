import {RequestHandlingState} from "Common/RequestHandling/Domain/Types";

export function isHttpRequestRunningWithEnabledLoader(state: RequestHandlingState): boolean { //todo: use reselect library!
    const requestWithEnabledLoader = state.runningHttpRequests.find((request) => (request.isLoaderEnabled));
    return !!requestWithEnabledLoader;
}