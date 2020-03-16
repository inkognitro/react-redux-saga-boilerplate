import {RequestWasSent} from "Common/RequestHandling/Domain/Event/RequestWasSent";
import {ResponseWasReceived} from "Common/RequestHandling/Domain/Event/ResponseWasReceived";

export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type Response = {
    statusCode: number,
    body: object,
};

export type Request = {
    method: RequestMethods,
    id: string,
    url: string,
    queryParameters?: object,
    headers?: object,
    body?: object,
    isLoaderEnabled?: boolean,
};

export type RequestResponse = {
    request: Request,
    response: (null | Response),
};

export type RequestHandlingState = {
    runningHttpRequests: Request[],
}

export enum RequestHandlingEventTypes {
    REQUEST_WAS_SENT = 'REQUEST_WAS_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc',
    RESPONSE_WAS_RECEIVED = 'RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc',
}

export type RequestHandlingEvents = (RequestWasSent | ResponseWasReceived);
