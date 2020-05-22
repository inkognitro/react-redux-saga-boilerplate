import { HttpApiV1EventTypes } from "Packages/Common/HttpApiV1/Domain/Types";
import { Request } from "Packages/Common/HttpFoundation/Domain/Types";
import {Event} from "Packages/Common/Types";

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
