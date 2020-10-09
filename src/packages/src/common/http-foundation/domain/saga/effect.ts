import { put, take } from "redux-saga/effects";
import { Request, RequestResponse, Response } from "../types";
import { createSendRequest } from "../command";
import {
    HttpFoundationEventTypes,
    RequestWasCancelled,
    RequestWasNotSent,
    ResponseCouldNotBeReceived,
    ResponseWasReceived,
} from "../event";

const executionEndiingEventTypes = [
    HttpFoundationEventTypes.REQUEST_WAS_NOT_SENT,
    HttpFoundationEventTypes.REQUEST_WAS_CANCELLED,
    HttpFoundationEventTypes.RESPONSE_COULD_NOT_BE_RECEIVED,
    HttpFoundationEventTypes.RESPONSE_WAS_RECEIVED,
];

type ExecutionEndingEvent = (RequestWasNotSent | RequestWasCancelled | ResponseCouldNotBeReceived | ResponseWasReceived)

export function* executeRequest<R extends Response = any>(request: Request): Generator {
    yield put(createSendRequest(request));
    let requestId = null;
    let event = null;
    while (requestId !== request.id) {
        event = yield take(executionEndiingEventTypes);
        // @ts-ignore
        requestId = event.payload.request.id;
    }
    // @ts-ignore
    const endingEvent: ExecutionEndingEvent = event;
    if (endingEvent.type === HttpFoundationEventTypes.RESPONSE_WAS_RECEIVED) {
        const { response } = endingEvent.payload;
        // @ts-ignore
        return createRequestResponse<R>(request, response);
    }
    return createRequestResponse<R>(request);
}

function createRequestResponse<R extends Response>(request: Request, response?: R): RequestResponse<R> {
    return { request, response };
}
