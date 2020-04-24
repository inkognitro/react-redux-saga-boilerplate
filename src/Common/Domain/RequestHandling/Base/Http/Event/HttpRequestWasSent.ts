import {
    HttpRequest,
    HttpEventTypes,
} from "Common/Domain/RequestHandling/Base/Http/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createRequestWasSent(request: HttpRequest): HttpRequestWasSent {
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
    request: HttpRequest;
  }
>;
