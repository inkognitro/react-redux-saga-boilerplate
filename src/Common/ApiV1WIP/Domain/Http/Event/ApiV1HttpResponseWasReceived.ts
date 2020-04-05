import {Event} from "Common/Bootstrap/Domain/Event";
import {ApiV1EventTypes} from "Common/ApiV1WIP/Domain/Http/Types";
import {HttpRequest, HttpResponse} from "Common/RequestHandling/Domain/Http/Types";

export function createApiV1HttpResponseWasReceived(
    request: HttpRequest,
    response: HttpResponse
): ApiV1HttpResponseWasReceived {
    return {
        type: ApiV1EventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED,
        payload: {request, response}
    };
}

export type ApiV1HttpResponseWasReceived = Event<ApiV1EventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED, {
    request: HttpRequest,
    response: HttpResponse,
}>;