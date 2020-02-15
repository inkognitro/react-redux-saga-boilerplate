import {RequestHandlingState} from "Common/RequestHandling/Domain/HttpRequestHandling/Types";
import {ExecutionSummary} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestHandling";

export function isRequestRunningWithEnabledLoader(state: RequestHandlingState): boolean {
    const requestWithEnabledLoader = state.runningHttpRequests.find((request) => (request.isLoaderEnabled));
    return !!requestWithEnabledLoader;
}

export function getResponseBodyJson(summary: ExecutionSummary): object {
    if (!summary.response || !summary.response.body) {
        return {};
    }
    return summary.response.body;
}