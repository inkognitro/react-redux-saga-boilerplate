import { Request } from "Packages/Common/HttpFoundation/Domain";
import { Event } from "Packages/Entity/CommonTypes";
import { ApiV1Response } from "../Types";
import { HttpApiV1EventTypes } from "./Types";

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
