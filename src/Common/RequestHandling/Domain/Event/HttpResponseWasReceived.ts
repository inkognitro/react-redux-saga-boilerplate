import {Event} from 'Common/AppBase/EventBus';
import {RequestHandlingEventTypes, HttpRequestResponse} from "Common/RequestHandling/Domain/Types";

export function createResponseWasReceived(requestResponse: HttpRequestResponse): HttpResponseWasReceived {
    return {
        type: RequestHandlingEventTypes.HTTP_RESPONSE_WAS_RECEIVED,
        payload: {
            requestResponse: requestResponse
        }
    };
}

export type HttpResponseWasReceived = Event<RequestHandlingEventTypes.HTTP_RESPONSE_WAS_RECEIVED, {
    requestResponse: HttpRequestResponse,
}>;