import { Event } from "Common/Domain/Bus/Event";
import { HttpApiV1EventTypes, ApiV1Response } from "Common/Domain/HttpApiV1/Types";
import { Request } from "Common/Domain/HttpFoundation/Types";

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
