import {Event} from 'Common/AppBase/EventBus';
import {RequestHandlingEventTypes, RequestResponse} from "Common/RequestHandling/Domain/Types";

export function createResponseWasReceived(requestResponse: RequestResponse): ResponseWasReceived {
    return {
        type: RequestHandlingEventTypes.RESPONSE_WAS_RECEIVED,
        payload: {
            requestResponse: requestResponse
        }
    };
}

export type ResponseWasReceived = Event<RequestHandlingEventTypes.RESPONSE_WAS_RECEIVED, {
    requestResponse: RequestResponse,
}>;