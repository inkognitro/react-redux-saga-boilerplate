import {
    RequestHandlingEvents,
    RequestHandlingEventTypes,
    RequestHandlingState
} from "Common/RequestHandling/Domain/Types";

const initialRequestHandilngState: RequestHandlingState = {
    runningHttpRequests: [],
};

export function requestHandling(state: RequestHandlingState = initialRequestHandilngState, action?: RequestHandlingEvents): RequestHandlingState {
    if (action === undefined) {
        return state;
    }

    if (action.type === RequestHandlingEventTypes.REQUEST_WAS_SENT) {
        return Object.assign({}, state, {
            runningHttpRequests: [
                action.payload.request,
                ...state.runningHttpRequests,
            ]
        });
    }

    if (action.type === RequestHandlingEventTypes.RESPONSE_WAS_RECEIVED) {
        return Object.assign({}, state, {
            runningHttpRequests: state.runningHttpRequests.filter(
                (request) => (request.id !== action.payload.requestResponse.request.id)
            ),
        });
    }

    return state;
}