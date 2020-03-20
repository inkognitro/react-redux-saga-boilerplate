import {
    RequestHandlingEvent,
    RequestHandlingEventTypes,
    RequestHandlingState
} from "Common/RequestHandling/Domain/Types";

const initialRequestHandilngState: RequestHandlingState = {
    runningHttpRequests: [],
};

export function requestHandling(state: RequestHandlingState = initialRequestHandilngState, event?: RequestHandlingEvent): RequestHandlingState {
    if (event === undefined) {
        return state;
    }

    if (event.type === RequestHandlingEventTypes.HTTP_REQUEST_WAS_SENT) {
        return Object.assign({}, state, {
            runningHttpRequests: [
                event.payload.request,
                ...state.runningHttpRequests,
            ]
        });
    }

    if (event.type === RequestHandlingEventTypes.HTTP_REQUEST_WAS_FINISHED) {
        return Object.assign({}, state, {
            runningHttpRequests: state.runningHttpRequests.filter(
                (request) => (request.id !== event.payload.requestResponse.request.id)
            ),
        });
    }

    return state;
}