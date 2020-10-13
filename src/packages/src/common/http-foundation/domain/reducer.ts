import { Reducer } from 'redux';
import { HttpFoundationState } from './types';
import {
    HttpFoundationEventTypes,
    ResponseCouldNotBeReceived,
    RequestWasCancelled,
    RequestWasNotSent,
    RequestWasSent,
    ResponseWasReceived,
} from './event';

type HttpFoundationEvent =
    | RequestWasSent
    | RequestWasNotSent
    | ResponseWasReceived
    | ResponseCouldNotBeReceived
    | RequestWasCancelled;

const initialHttpFoundationState: HttpFoundationState = {
    runningRequests: [],
};

const eventTypesForRunningHttpRequestsRemoval = [
    HttpFoundationEventTypes.REQUEST_WAS_CANCELLED,
    HttpFoundationEventTypes.RESPONSE_COULD_NOT_BE_RECEIVED,
    HttpFoundationEventTypes.RESPONSE_WAS_RECEIVED,
];

export const httpFoundationReducer: Reducer<HttpFoundationState> = (
    state = initialHttpFoundationState,
    event: HttpFoundationEvent
) => {
    if (!event) {
        return state;
    }
    if (event.type === HttpFoundationEventTypes.REQUEST_WAS_SENT) {
        return {
            ...state,
            runningHttpRequests: [...state.runningRequests, event.payload.request],
        };
    }
    if (eventTypesForRunningHttpRequestsRemoval.includes(event.type)) {
        return {
            ...state,
            runningHttpRequests: state.runningRequests.filter((request) => request.id !== event.payload.request.id),
        };
    }
    return state;
};
