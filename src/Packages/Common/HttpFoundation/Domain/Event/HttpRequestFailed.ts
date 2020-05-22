import {
    HttpEventTypes,
    Request,
} from "Packages/Common/HttpFoundation/Domain/Types";
import {Event} from "Packages/Common/Types";

export function createHttpRequestFailed(
    request: Request,
): HttpRequestFailed {
    return {
        type: HttpEventTypes.HTTP_REQUEST_FAILED,
        payload: { request },
    };
}

export type HttpRequestFailed = Event<
  HttpEventTypes.HTTP_REQUEST_FAILED,
  {
    request: Request;
  }
>;
