import { Request } from "Packages/Common/HttpFoundation/Domain/Types";
import { Event } from "Packages/Common/CommonTypes";
import { HttpApiV1EventTypes, ApiV1Response } from "../Types";

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
