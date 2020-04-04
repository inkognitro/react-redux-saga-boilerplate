import {
    RequestHandlerEventTypes,
    HttpRequest,
    HttpResponse
} from "Common/RequestHandler/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createHttpErrorResponseWasReceived(
    request: HttpRequest,
    response: HttpResponse
): HttpErrorResponseWasReceived {
    return {
        type: RequestHandlerEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
        payload: {request, response}
    };
}

export type HttpErrorResponseWasReceived<ResponseBody = any> = Event<RequestHandlerEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED, {
    request: HttpRequest,
    response: HttpResponse<ResponseBody>,
}>;