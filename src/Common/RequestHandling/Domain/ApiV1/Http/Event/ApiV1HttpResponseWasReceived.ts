import {Event} from "Common/Bus/Domain/Event";
import {ApiV1HttpEventTypes, BasicResponseBody} from "Common/RequestHandling/Domain/ApiV1/Http/Types";
import {HttpRequest, HttpResponse} from "Common/RequestHandling/Domain/Base/Http/Types";

export function createApiV1HttpResponseWasReceived(
    request: HttpRequest,
    response: HttpResponse
): ApiV1HttpResponseWasReceived {
    return {
        type: ApiV1HttpEventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED,
        payload: {request, response}
    };
}

export type ApiV1HttpResponseWasReceived = Event<ApiV1HttpEventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED, {
    request: HttpRequest,
    response: HttpResponse<BasicResponseBody>,
}>;