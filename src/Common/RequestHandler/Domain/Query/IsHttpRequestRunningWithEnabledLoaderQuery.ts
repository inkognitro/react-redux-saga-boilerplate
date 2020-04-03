import {RequestHandlerState} from "Common/RequestHandler/Domain/Types";

export function isHttpRequestRunningWithEnabledLoader(state: RequestHandlerState): boolean { //todo: use reselect library!
    const requestWithEnabledLoader = state.runningHttpRequests.find((request) => (request.isLoaderEnabled));
    return !!requestWithEnabledLoader;
}