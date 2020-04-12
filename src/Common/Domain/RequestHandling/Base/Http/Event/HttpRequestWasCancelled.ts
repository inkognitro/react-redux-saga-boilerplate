import {HttpRequest, HttpEventTypes} from "Common/Domain/RequestHandling/Base/Http/Types";
import {Event} from "Common/Domain/Bus/Event";

export function createHttpRequestWasCancelled(request: HttpRequest): HttpRequestWasCancelled {
    return {
        type: HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
        payload: {request}
    };
}

export type HttpRequestWasCancelled = Event<HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED, {
    request: HttpRequest,
}>;