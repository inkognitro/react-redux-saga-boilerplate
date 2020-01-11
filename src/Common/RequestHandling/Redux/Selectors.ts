import {ExecutionSummary, RequestHandlingState} from "Common/RequestHandling/Redux/Types";

export function isRequestRunningWithEnabledLoader(state: RequestHandlingState): boolean { //todo: not working properly, try with a connected component!
    const requestWithEnabledLoader = state.runningHttpRequests.find((request) => (request.isLoaderEnabled));
    return !!requestWithEnabledLoader;
}

export function getResponseBodyJson(summary: ExecutionSummary): object {
    if (!summary.response || !summary.response.body) {
        return {};
    }
    return summary.response.body;
}