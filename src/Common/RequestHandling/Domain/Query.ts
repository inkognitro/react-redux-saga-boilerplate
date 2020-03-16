import {RequestResponse, RequestHandlingState} from "Common/RequestHandling/Domain/Types";

export function isRequestRunningWithEnabledLoader(state: RequestHandlingState): boolean {
    const requestWithEnabledLoader = state.runningHttpRequests.find((request) => (request.isLoaderEnabled));
    return !!requestWithEnabledLoader;
}

export function getResponseBodyJson(summary: RequestResponse): object {
    if (!summary.response || !summary.response.body) {
        return {};
    }
    return summary.response.body;
}