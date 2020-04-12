import {
    HttpEventTypes,
    HttpRequest,
    HttpResponse
} from "Common/Domain/RequestHandling/Base/Http/Types";
import {Event} from "Common/Domain/Bus/Event";

export function createHttpSuccessResponseWasReceived(
    request: HttpRequest,
    response: HttpResponse
): HttpSuccessResponseWasReceived {
    return {
        type: HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
        payload: {request, response}
    };
}

export type HttpSuccessResponseWasReceived<ResponseBody = any> = Event<HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED, {
    request: HttpRequest,
    response: HttpResponse<ResponseBody>,
}>;