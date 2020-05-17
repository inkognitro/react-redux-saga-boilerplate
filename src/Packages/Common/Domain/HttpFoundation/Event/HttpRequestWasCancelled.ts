import {
    Request,
    HttpEventTypes,
} from "Packages/Common/Domain/HttpFoundation/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

export function createHttpRequestWasCancelled(
    request: Request,
): HttpRequestWasCancelled {
    return {
        type: HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
        payload: { request },
    };
}

export type HttpRequestWasCancelled = Event<
  HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
  {
    request: Request;
  }
>;
