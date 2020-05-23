import { Event } from "Packages/Common/CommonTypes";
import {
    Request,
    HttpEventTypes,
} from "../Types";

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
