import {HttpRequestWasSent} from "Common/RequestHandling/Domain/Event/HttpRequestWasSent";
import {HttpResponseWasReceived} from "Common/RequestHandling/Domain/Event/HttpResponseWasReceived";

export enum HttpRequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type HttpResponse = {
    statusCode: number,
    body: object,
};

export type HttpRequest = {
    method: HttpRequestMethods,
    id: string,
    url: string,
    queryParameters?: object,
    headers?: object,
    body?: object,
    isLoaderEnabled?: boolean,
};

export type HttpRequestResponse = {
    request: HttpRequest,
    response: (null | HttpResponse),
};

export type RequestHandlingState = {
    runningHttpRequests: HttpRequest[],
}

export enum RequestHandlingEventTypes {
    HTTP_REQUEST_WAS_SENT = 'HTTP_REQUEST_WAS_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc',
    HTTP_RESPONSE_WAS_RECEIVED = 'HTTP_RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc',
}

export type RequestHandlingEvents = (HttpRequestWasSent | HttpResponseWasReceived);
