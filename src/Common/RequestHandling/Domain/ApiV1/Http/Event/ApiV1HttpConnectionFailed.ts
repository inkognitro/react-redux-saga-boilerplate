import {Event} from "Common/Bootstrap/Domain/Event";
import {ApiV1HttpEventTypes} from "Common/RequestHandling/Domain/ApiV1/Http/Types";
import {HttpRequest} from "Common/RequestHandling/Domain/Base/Http/Types";

export function createApiV1HttpConnectionFailed(request: HttpRequest): ApiV1HttpConnectionFailed {
    return {
        type: ApiV1HttpEventTypes.API_V1_HTTP_CONNECTION_FAILED,
        payload: {request}
    };
}

export type ApiV1HttpConnectionFailed = Event<ApiV1HttpEventTypes.API_V1_HTTP_CONNECTION_FAILED, {
    request: HttpRequest,
}>;