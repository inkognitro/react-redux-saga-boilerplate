import { Event } from "Packages/Entity/CommonTypes";
import { Request } from "../Types";
import { HttpEventTypes } from "./Types";

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
