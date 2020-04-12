import {HttpEventTypes, HttpRequest} from "Common/Domain/RequestHandling/Base/Http/Types";
import {Event} from "Common/Domain/Bus/Event";

export function createHttpRequestFailed(request: HttpRequest): HttpRequestFailed {
    return {
        type: HttpEventTypes.HTTP_REQUEST_FAILED,
        payload: {request}
    };
}

export type HttpRequestFailed = Event<HttpEventTypes.HTTP_REQUEST_FAILED, {
    request: HttpRequest,
}>;