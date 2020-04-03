import {RequestHandlerEventTypes, HttpRequestResponse} from "Common/RequestHandler/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createHttpRequestWasFinished(requestResponse: HttpRequestResponse): HttpRequestWasFinished {
    return {
        type: RequestHandlerEventTypes.HTTP_REQUEST_WAS_FINISHED,
        payload: {
            requestResponse: requestResponse
        }
    };
}

export type HttpRequestWasFinished = Event<RequestHandlerEventTypes.HTTP_REQUEST_WAS_FINISHED, {
    requestResponse: HttpRequestResponse,
}>;