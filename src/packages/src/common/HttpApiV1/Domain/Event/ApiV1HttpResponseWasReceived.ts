import { Request } from "packages/common/http-foundation/domain";
import { Event } from "packages/entity/common-types";
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
