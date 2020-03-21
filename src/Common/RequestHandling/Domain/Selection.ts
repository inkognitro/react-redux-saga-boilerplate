import {RequestHandlingState} from "Common/RequestHandling/Domain/Types";

export function isHttpRequestRunningWithEnabledLoader(state: RequestHandlingState): boolean {
    const requestWithEnabledLoader = state.runningHttpRequests.find((request) => (request.isLoaderEnabled));
    return !!requestWithEnabledLoader;
}