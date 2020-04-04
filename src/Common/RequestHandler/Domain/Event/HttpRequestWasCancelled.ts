import {HttpRequest, RequestHandlerEventTypes} from "Common/RequestHandler/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createHttpRequestWasCancelled(request: HttpRequest): HttpRequestWasCancelled {
    return {
        type: RequestHandlerEventTypes.HTTP_REQUEST_WAS_CANCELLED,
        payload: {request}
    };
}

export type HttpRequestWasCancelled = Event<RequestHandlerEventTypes.HTTP_REQUEST_WAS_CANCELLED, {
    request: HttpRequest,
}>;