import {RequestHandlerEventTypes, HttpRequest} from "Common/RequestHandling/Domain/Base/Http/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createHttpRequestFailed(request: HttpRequest): HttpRequestFailed {
    return {
        type: RequestHandlerEventTypes.HTTP_REQUEST_FAILED,
        payload: {request}
    };
}

export type HttpRequestFailed = Event<RequestHandlerEventTypes.HTTP_REQUEST_FAILED, {
    request: HttpRequest,
}>;