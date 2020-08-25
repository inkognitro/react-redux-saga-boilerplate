import { Request } from "packages/common/http-foundation/domain";
import { Event } from "packages/entity/common-types";
import { ApiV1Response } from "./types";

export enum HttpApiV1EventTypes {
    API_V1_HTTP_RESPONSE_WAS_RECEIVED = "API_V1_HTTP_RESPONSE_WAS_RECEIVED-47406dac-1dc9-4831-a20a-ac917a944ddb",
    API_V1_HTTP_CONNECTION_FAILED = "API_V1_HTTP_CONNECTION_FAILED-47406dac-1dc9-4831-a20a-ac917a944ddb",
}

export function createApiV1HttpResponseWasReceived(
    request: Request,
    response: ApiV1Response,
): ApiV1HttpResponseWasReceived {
    return {
        type: HttpApiV1EventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED,
        payload: { request, response },
    };
}

export type ApiV1HttpResponseWasReceived = Event<HttpApiV1EventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED, {
    request: Request;
    response: ApiV1Response;
}>;

export function createApiV1HttpConnectionFailed(
    request: Request,
): ApiV1HttpConnectionFailed {
    return {
        type: HttpApiV1EventTypes.API_V1_HTTP_CONNECTION_FAILED,
        payload: { request },
    };
}

export type ApiV1HttpConnectionFailed = Event<HttpApiV1EventTypes.API_V1_HTTP_CONNECTION_FAILED,
    {
        request: Request;
    }>;
