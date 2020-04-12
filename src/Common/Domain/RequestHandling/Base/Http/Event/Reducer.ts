import {
    HttpEvent,
    HttpEventTypes,
    HttpState
} from "Common/Domain/RequestHandling/Base/Http/Types";

const initialHttpState: HttpState = {
    runningHttpRequests: [],
};

const eventTypesForRunningHttpRequestsRemoval = [
    HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
    HttpEventTypes.HTTP_REQUEST_FAILED,
    HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
    HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
];

export function httpReducer(
    state: HttpState = initialHttpState,
    event?: HttpEvent
): HttpState {
    if (!event) {
        return state;
    }

    if (event.type === HttpEventTypes.HTTP_REQUEST_WAS_SENT) {
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