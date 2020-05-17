import {
    HttpEventTypes,
    Request,
} from "Common/Domain/HttpFoundation/Types";
import { Event } from "Common/Domain/Bus/Event";

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
