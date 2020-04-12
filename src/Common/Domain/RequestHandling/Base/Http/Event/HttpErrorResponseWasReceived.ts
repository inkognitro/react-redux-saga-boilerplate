import {
    HttpEventTypes,
    HttpRequest,
    HttpResponse
} from "Common/Domain/RequestHandling/Base/Http/Types";
import {Event} from "Common/Domain/Bus/Event";

export function createHttpErrorResponseWasReceived(
    request: HttpRequest,
    response: HttpResponse
): HttpErrorResponseWasReceived {
    return {
        type: HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
        payload: {request, response}
    };
}

export type HttpErrorResponseWasReceived<ResponseBody = any> = Event<HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED, {
    request: HttpRequest,
    response: HttpResponse<ResponseBody>,
}>;