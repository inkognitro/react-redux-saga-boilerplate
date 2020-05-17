import {
    Request,
    HttpEventTypes,
} from "Packages/Common/Domain/HttpFoundation/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

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
