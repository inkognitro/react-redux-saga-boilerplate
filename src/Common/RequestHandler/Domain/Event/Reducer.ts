import {
    RequestHandlerEvent,
    RequestHandlerEventTypes,
    RequestHandlerState
} from "Common/RequestHandler/Domain/Types";

const initialRequestHandlingState: RequestHandlerState = {
    runningHttpRequests: [],
};

export function requestHandlingReducer(state: RequestHandlerState = initialRequestHandlingState, event?: RequestHandlerEvent): RequestHandlerState {
    if (event === undefined) {
        return state;
    }

    if (event.type === RequestHandlerEventTypes.HTTP_REQUEST_WAS_SENT) {
        return Object.assign({}, state, {
            runningHttpRequests: [
                event.payload.request,
                ...state.runningHttpRequests,
            ]
        });
    }

    if (event.type === RequestHandlerEventTypes.HTTP_REQUEST_WAS_FINISHED) {
        return Object.assign({}, state, {
            runningHttpRequests: state.runningHttpRequests.filter(
                (request) => (request.id !== event.payload.requestResponse.request.id)
            ),
        });
    }

    return state;
}