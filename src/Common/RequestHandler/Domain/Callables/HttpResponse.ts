import {HttpRequest, HttpResponse, RequestHandlerEventTypes} from "Common/RequestHandler/Domain/Types";
import {take} from "@redux-saga/core/effects";
import {HttpRequestWasNotSent} from "Common/RequestHandler/Domain/Event/HttpRequestWasNotSent";
import {HttpSuccessResponseWasReceived} from "Common/RequestHandler/Domain/Event/HttpSuccessResponseWasReceived";
import {HttpErrorResponseWasReceived} from "Common/RequestHandler/Domain/Event/HttpErrorResponseWasReceived";
import {HttpRequestFailed} from "Common/RequestHandler/Domain/Event/HttpRequestFailed";
import {HttpRequestWasCancelled} from "Common/RequestHandler/Domain/Event/HttpRequestWasCancelled";

const httpRequestExecutionEndingEventTypes = [
    RequestHandlerEventTypes.HTTP_REQUEST_WAS_NOT_SENT,
    RequestHandlerEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
    RequestHandlerEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
    RequestHandlerEventTypes.HTTP_REQUEST_FAILED,
    RequestHandlerEventTypes.HTTP_REQUEST_WAS_CANCELLED,
];

type HttpRequestExecutionEndingEvent = (
    HttpRequestWasNotSent
    | HttpSuccessResponseWasReceived
    | HttpErrorResponseWasReceived
    | HttpRequestFailed
    | HttpRequestWasCancelled
);

export function* findHttpResponse(request: HttpRequest): Generator<unknown, (null | HttpResponse)> {
    let requestId = null;
    let event = null;
    while (requestId !== request.id) {
        event = yield take(httpRequestExecutionEndingEventTypes);
        //@ts-ignore
        requestId = event.payload.request.id;
    }
    //@ts-ignore
    const eventToUse: HttpRequestExecutionEndingEvent = event;
    if (eventToUse.type === RequestHandlerEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED) {
        return eventToUse.payload.response;
    }
    if (eventToUse.type === RequestHandlerEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED) {
        return eventToUse.payload.response;
    }
    return null;
}