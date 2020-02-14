import {
    RequestHandlingActions,
    RequestHandlingActionTypes,
    RequestHandlingState
} from "Common/RequestHandling/Domain/Types";

const initialRequestHandilngState: RequestHandlingState = {
    runningHttpRequests: [],
};

export function requestHandling(state: RequestHandlingState = initialRequestHandilngState, action?: RequestHandlingActions): RequestHandlingState {
    if (action === undefined) {
        return state;
    }

    if (action.type === RequestHandlingActionTypes.SEND_REQUEST) {
        return Object.assign({}, state, {
            runningHttpRequests: [
                action.payload.request,
                ...state.runningHttpRequests,
            ]
        });
    }

    if (action.type === RequestHandlingActionTypes.CLOSE_REQUEST) {
        return Object.assign({}, state, {
            runningHttpRequests: state.runningHttpRequests.filter(
                (request) => (request.id !== action.payload.requestId)
            ),
        });
    }

    return state;
}