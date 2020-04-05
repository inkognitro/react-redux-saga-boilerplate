import {Event} from "Common/Bootstrap/Domain/Event";
import {ApiV1EventTypes, ApiV1HttpRequest, ApiV1HttpResponse} from "Common/ApiV1WIP/Domain/Types";

export function createApiV1HttpSuccessResponseWasReceived(
    request: ApiV1HttpRequest,
    response: ApiV1HttpResponse
): ApiV1HttpSuccessResponseWasReceived {
    return {
        type: ApiV1EventTypes.API_V1_HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
        payload: {request, response}
    };
}

export type ApiV1HttpSuccessResponseWasReceived = Event<ApiV1EventTypes.API_V1_HTTP_SUCCESS_RESPONSE_WAS_RECEIVED, {
    request: ApiV1HttpRequest,
    response: ApiV1HttpResponse,
}>;