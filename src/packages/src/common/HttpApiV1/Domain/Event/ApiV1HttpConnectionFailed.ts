import { Request } from "packages/common/HttpFoundation/Domain";
import { Event } from "packages/entity/common-types";
import { HttpApiV1EventTypes } from "./Types";

export function createApiV1HttpConnectionFailed(
    request: Request,
): ApiV1HttpConnectionFailed {
    return {
        type: HttpApiV1EventTypes.API_V1_HTTP_CONNECTION_FAILED,
        payload: { request },
    };
}

export type ApiV1HttpConnectionFailed = Event<
  HttpApiV1EventTypes.API_V1_HTTP_CONNECTION_FAILED,
  {
    request: Request;
  }
>;
