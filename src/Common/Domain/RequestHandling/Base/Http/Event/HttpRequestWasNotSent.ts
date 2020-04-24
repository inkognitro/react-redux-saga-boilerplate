import {
    HttpRequest,
    HttpEventTypes,
} from "Common/Domain/RequestHandling/Base/Http/Types";
import { Event } from "Common/Domain/Bus/Event";

export enum Reasons {
  REQUEST_WITH_SAME_ID_IS_ALREADY_RUNNING = "requestWithSameIdIsAlreadyRunning",
}

export function createHttpRequestWasNotSent(
    request: HttpRequest,
    reason: Reasons,
): HttpRequestWasNotSent {
    return {
        type: HttpEventTypes.HTTP_REQUEST_WAS_NOT_SENT,
        payload: {
            request,
            reason,
        },
    };
}

export type HttpRequestWasNotSent = Event<
  HttpEventTypes.HTTP_REQUEST_WAS_NOT_SENT,
  {
    request: HttpRequest;
    reason: Reasons;
  }
>;
