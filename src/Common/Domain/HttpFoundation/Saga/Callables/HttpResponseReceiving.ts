import { Request, HttpEventTypes, Response } from "Common/Domain/HttpFoundation/Types";
import { take, StrictEffect } from "redux-saga/effects";
import { HttpRequestWasNotSent } from "Common/Domain/HttpFoundation/Event/HttpRequestWasNotSent";
import { HttpSuccessResponseWasReceived } from "Common/Domain/HttpFoundation/Event/HttpSuccessResponseWasReceived";
import { HttpErrorResponseWasReceived } from "Common/Domain/HttpFoundation/Event/HttpErrorResponseWasReceived";
import { HttpRequestFailed } from "Common/Domain/HttpFoundation/Event/HttpRequestFailed";
import { HttpRequestWasCancelled } from "Common/Domain/HttpFoundation/Event/HttpRequestWasCancelled";

const httpRequestExecutionEndingEventTypes = [
    HttpEventTypes.HTTP_REQUEST_WAS_NOT_SENT,
    HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
    HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
    HttpEventTypes.HTTP_REQUEST_FAILED,
    HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
];

type HttpRequestExecutionEndingEvent = (
    HttpRequestWasNotSent
    | HttpSuccessResponseWasReceived
    | HttpErrorResponseWasReceived
    | HttpRequestFailed
    | HttpRequestWasCancelled
);

type ReceiveHttpResponseGenerator<SpecificHttpResponse> = Generator<StrictEffect, (null | SpecificHttpResponse)>;

export function* receiveHttpResponse<SpecificHttpResponse = Response>(
    request: Request,
): ReceiveHttpResponseGenerator<SpecificHttpResponse> {
    let requestId = null;
    let event = null;
    while (requestId !== request.id) {
        event = yield take(httpRequestExecutionEndingEventTypes);
        // @ts-ignore
        requestId = event.payload.request.id;
    }
    // @ts-ignore
    const eventToUse: HttpRequestExecutionEndingEvent = event;
    if (eventToUse.type === HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED) {
        // @ts-ignore
        return eventToUse.payload.response;
    }
    if (eventToUse.type === HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED) {
        // @ts-ignore
        return eventToUse.payload.response;
    }
    return null;
}
