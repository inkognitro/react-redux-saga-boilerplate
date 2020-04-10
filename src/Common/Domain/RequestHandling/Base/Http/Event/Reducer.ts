import {
    RequestHandlerEvent,
    RequestHandlerEventTypes,
    HttpState
} from "Common/Domain/RequestHandling/Base/Http/Types";

const initialRequestHandlingState: HttpState = {
    runningHttpRequests: [],
};

const eventTypesForRunningHttpRequestsRemoval = [
    RequestHandlerEventTypes.HTTP_REQUEST_WAS_CANCELLED,
    RequestHandlerEventTypes.HTTP_REQUEST_FAILED,
    RequestHandlerEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
    RequestHandlerEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
];

export function requestHandlerReducer(
    state: HttpState = initialRequestHandlingState,
    event?: RequestHandlerEvent
): HttpState {
    if (!event) {
        return state;
    }

    if (event.type === RequestHandlerEventTypes.HTTP_REQUEST_WAS_SENT) {
        return {
            ...state,
            runningHttpRequests: [
                ...state.runningHttpRequests,
                event.payload.request,
            ],
        };
    }

    if (eventTypesForRunningHttpRequestsRemoval.includes(event.type)) {
        return {
            ...state,
            runningHttpRequests: state.runningHttpRequests.filter(
                (request) => (request.id !== event.payload.request.id)
            ),
        };
    }

    return state;
}