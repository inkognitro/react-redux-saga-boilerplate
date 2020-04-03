import {HttpRequest, RequestHandlerEventTypes} from "Common/RequestHandler/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createRequestWasSent(request: HttpRequest): HttpRequestWasSent {
    return {
        type: RequestHandlerEventTypes.HTTP_REQUEST_WAS_SENT,
        payload: {
            request: request
        }
    };
}

export type HttpRequestWasSent = Event<RequestHandlerEventTypes.HTTP_REQUEST_WAS_SENT, {
    request: HttpRequest,
}>;