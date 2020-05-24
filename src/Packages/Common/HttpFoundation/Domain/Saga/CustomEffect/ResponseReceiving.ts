import {
    call, take, StrictEffect, CallEffect,
} from "redux-saga/effects";
import {
    HttpRequestWasNotSent,
    HttpSuccessResponseWasReceived,
    HttpErrorResponseWasReceived,
    HttpRequestFailed,
    HttpRequestWasCancelled,
} from "Packages/Common/HttpFoundation";
import { Request, HttpEventTypes, Response } from "../../Types";

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

export type ReceiveHttpResponseGenerator<SpecificResponse> = Generator<StrictEffect, (null | SpecificResponse)>;

function* internalReceiveResponse<SpecificResponse = Response>(
    request: Request,
): ReceiveHttpResponseGenerator<SpecificResponse> {
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

type ReceiveResponseCallEffect<SpecificResponse> = CallEffect<{
    context: any
    fn: ReceiveHttpResponseGenerator<SpecificResponse>
    args: any[]
}>

export function receiveResponse<SpecificResponse>(request: Request): ReceiveResponseCallEffect<SpecificResponse> {
    // @ts-ignore
    return call(internalReceiveResponse, request);
}
