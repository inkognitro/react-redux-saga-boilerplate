import { Event } from "Common/Domain/Bus/Event";
import { HttpApiV1EventTypes } from "Common/Domain/HttpApiV1/Types";
import { Request } from "Common/Domain/HttpFoundation/Types";

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
