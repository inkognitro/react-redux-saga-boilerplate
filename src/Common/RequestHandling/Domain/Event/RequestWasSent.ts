import {Event} from 'Common/AppBase/EventBus';
import {Request, RequestHandlingEventTypes} from "Common/RequestHandling/Domain/Types";

export function createRequestWasSent(request: Request): RequestWasSent {
    return {
        type: RequestHandlingEventTypes.REQUEST_WAS_SENT,
        payload: {
            request: request
        }
    };
}

export type RequestWasSent = Event<RequestHandlingEventTypes.REQUEST_WAS_SENT, {
    request: Request,
}>;