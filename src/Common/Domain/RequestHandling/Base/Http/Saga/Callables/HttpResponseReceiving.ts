import {
    HttpRequest,
    HttpResponse,
    HttpEventTypes,
} from "Common/Domain/RequestHandling/Base/Http/Types";
import { take } from "@redux-saga/core/effects";
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

type HttpRequestExecutionEndingEvent =
  | HttpRequestWasNotSent
  | HttpSuccessResponseWasReceived
  | HttpErrorResponseWasReceived
  | HttpRequestFailed
  | HttpRequestWasCancelled;

export function* receiveHttpResponse(
    request: HttpRequest,
): Generator<unknown, null | HttpResponse> {
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
        return eventToUse.payload.response;
    }
    if (eventToUse.type === HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED) {
        return eventToUse.payload.response;
    }
    return null;
}
