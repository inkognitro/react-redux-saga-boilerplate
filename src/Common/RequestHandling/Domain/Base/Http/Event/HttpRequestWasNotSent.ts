import {HttpRequest, RequestHandlerEventTypes} from "Common/RequestHandling/Domain/Base/Http/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export enum Reasons {
    REQUEST_WITH_SAME_ID_IS_ALREADY_RUNNING = 'requestWithSameIdIsAlreadyRunning',
}

export function createHttpRequestWasNotSent(request: HttpRequest, reason: Reasons): HttpRequestWasNotSent {
    return {
        type: RequestHandlerEventTypes.HTTP_REQUEST_WAS_NOT_SENT,
        payload: {
            request: request,
            reason: reason
        }
    };
}

export type HttpRequestWasNotSent = Event<RequestHandlerEventTypes.HTTP_REQUEST_WAS_NOT_SENT, {
    request: HttpRequest,
    reason: Reasons,
}>;