import {Event} from 'Common/AppBase/EventBus';
import {RequestHandlingEventTypes, HttpRequestResponse} from "Common/RequestHandling/Domain/Types";

export function createHttpRequestWasFinished(requestResponse: HttpRequestResponse): HttpRequestWasFinished {
    return {
        type: RequestHandlingEventTypes.HTTP_REQUEST_WAS_FINISHED,
        payload: {
            requestResponse: requestResponse
        }
    };
}

export type HttpRequestWasFinished = Event<RequestHandlingEventTypes.HTTP_REQUEST_WAS_FINISHED, {
    requestResponse: HttpRequestResponse,
}>;