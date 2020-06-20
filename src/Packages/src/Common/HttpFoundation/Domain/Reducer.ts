import { HttpFoundationState } from "./Types";
import { HttpEventTypes } from "./Event/Types";
import { HttpRequestWasSent } from "./Event/HttpRequestWasSent";
import { HttpRequestWasNotSent } from "./Event/HttpRequestWasNotSent";
import { HttpSuccessResponseWasReceived } from "./Event/HttpSuccessResponseWasReceived";
import { HttpErrorResponseWasReceived } from "./Event/HttpErrorResponseWasReceived";
import { HttpRequestFailed } from "./Event/HttpRequestFailed";
import { HttpRequestWasCancelled } from "./Event/HttpRequestWasCancelled";

type HttpEvent = (
    | HttpRequestWasSent
    | HttpRequestWasNotSent
    | HttpSuccessResponseWasReceived
    | HttpErrorResponseWasReceived
    | HttpRequestFailed
    | HttpRequestWasCancelled
);

const initialHttpState: HttpFoundationState = {
    runningHttpRequests: [],
};

const eventTypesForRunningHttpRequestsRemoval = [
    HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
    HttpEventTypes.HTTP_REQUEST_FAILED,
    HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
    HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
];

export function httpFoundationReducer(
    state: HttpFoundationState = initialHttpState,
    event?: HttpEvent,
): HttpFoundationState {
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
                (request) => request.id !== event.payload.request.id,
            ),
        };
    }

    return state;
}
