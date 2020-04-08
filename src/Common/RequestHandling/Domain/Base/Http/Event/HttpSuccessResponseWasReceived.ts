import {
    RequestHandlerEventTypes,
    HttpRequest,
    HttpResponse
} from "Common/RequestHandling/Domain/Base/Http/Types";
import {Event} from "Common/Bus/Domain/Event";

export function createHttpSuccessResponseWasReceived(
    request: HttpRequest,
    response: HttpResponse
): HttpSuccessResponseWasReceived {
    return {
        type: RequestHandlerEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
        payload: {request, response}
    };
}

export type HttpSuccessResponseWasReceived<ResponseBody = any> = Event<RequestHandlerEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED, {
    request: HttpRequest,
    response: HttpResponse<ResponseBody>,
}>;