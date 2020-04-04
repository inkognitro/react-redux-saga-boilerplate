import {RequestHandlerEventTypes, HttpRequest} from "Common/RequestHandler/Domain/Types";
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