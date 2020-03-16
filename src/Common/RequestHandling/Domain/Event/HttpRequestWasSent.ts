import {Event} from 'Common/AppBase/EventBus';
import {HttpRequest, RequestHandlingEventTypes} from "Common/RequestHandling/Domain/Types";

export function createRequestWasSent(request: HttpRequest): HttpRequestWasSent {
    return {
        type: RequestHandlingEventTypes.HTTP_REQUEST_WAS_SENT,
        payload: {
            request: request
        }
    };
}

export type HttpRequestWasSent = Event<RequestHandlingEventTypes.HTTP_REQUEST_WAS_SENT, {
    request: HttpRequest,
}>;