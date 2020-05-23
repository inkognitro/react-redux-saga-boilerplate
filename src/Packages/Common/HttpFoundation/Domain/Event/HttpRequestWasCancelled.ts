import { Event } from "Packages/Common/CommonTypes";
import {
    Request,
    HttpEventTypes,
} from "../Types";

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
