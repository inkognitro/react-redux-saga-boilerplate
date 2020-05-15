import {HttpRequest, HttpEventTypes, HttpResponse} from "Common/Domain/RequestHandling/Base/Http/Types";
import { take, StrictEffect } from "redux-saga/effects";
import { HttpRequestWasNotSent } from "Common/Domain/RequestHandling/Base/Http/Event/HttpRequestWasNotSent";
import { HttpSuccessResponseWasReceived } from "Common/Domain/RequestHandling/Base/Http/Event/HttpSuccessResponseWasReceived";
import { HttpErrorResponseWasReceived } from "Common/Domain/RequestHandling/Base/Http/Event/HttpErrorResponseWasReceived";
import { HttpRequestFailed } from "Common/Domain/RequestHandling/Base/Http/Event/HttpRequestFailed";
import { HttpRequestWasCancelled } from "Common/Domain/RequestHandling/Base/Http/Event/HttpRequestWasCancelled";

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

export function* receiveHttpResponse<SpecificHttpResponse = HttpResponse>(
    request: HttpRequest,
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
