import {HttpRequestResponse, RequestHandlingState} from "Common/RequestHandling/Domain/Types";

export function isHttpRequestRunningWithEnabledLoader(state: RequestHandlingState): boolean {
    const requestWithEnabledLoader = state.runningHttpRequests.find((request) => (request.isLoaderEnabled));
    return !!requestWithEnabledLoader;
}

export function getResponseBodyJson(summary: HttpRequestResponse): object {
    if (!summary.response || !summary.response.body) {
        return {};
    }
    return summary.response.body;
}