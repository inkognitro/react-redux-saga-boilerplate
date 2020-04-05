import {Event} from "Common/Bootstrap/Domain/Event";
import {ApiV1EventTypes} from "Common/ApiV1WIP/Domain/Http/Types";
import {HttpRequest} from "Common/RequestHandling/Domain/Http/Types";

export function createApiV1HttpConnectionFailed(request: HttpRequest): ApiV1HttpConnectionFailed {
    return {
        type: ApiV1EventTypes.API_V1_HTTP_CONNECTION_FAILED,
        payload: {request}
    };
}

export type ApiV1HttpConnectionFailed = Event<ApiV1EventTypes.API_V1_HTTP_CONNECTION_FAILED, {
    request: HttpRequest,
}>;