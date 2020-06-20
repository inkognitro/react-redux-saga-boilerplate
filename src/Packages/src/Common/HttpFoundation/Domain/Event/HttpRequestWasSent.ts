import { Event } from "Packages/Entity/CommonTypes";
import { Request } from "../Types";
import { HttpEventTypes } from "./Types";

export function createRequestWasSent(request: Request): HttpRequestWasSent {
    return {
        type: HttpEventTypes.HTTP_REQUEST_WAS_SENT,
        payload: {
            request,
        },
    };
}

export type HttpRequestWasSent = Event<
  HttpEventTypes.HTTP_REQUEST_WAS_SENT,
  {
    request: Request;
  }
>;
