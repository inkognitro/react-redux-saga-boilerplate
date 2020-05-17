import {
    HttpEventTypes,
    Request,
} from "Packages/Common/Domain/HttpFoundation/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

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
