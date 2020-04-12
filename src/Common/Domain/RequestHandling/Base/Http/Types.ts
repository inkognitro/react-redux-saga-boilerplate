import {HttpRequestWasSent} from "Common/Domain/RequestHandling/Base/Http/Event/HttpRequestWasSent";
import {HttpErrorResponseWasReceived} from "Common/Domain/RequestHandling/Base/Http/Event/HttpErrorResponseWasReceived";
import {HttpRequestFailed} from "Common/Domain/RequestHandling/Base/Http/Event/HttpRequestFailed";
import {HttpRequestWasCancelled} from "Common/Domain/RequestHandling/Base/Http/Event/HttpRequestWasCancelled";
import {HttpRequestWasNotSent} from "Common/Domain/RequestHandling/Base/Http/Event/HttpRequestWasNotSent";
import {HttpSuccessResponseWasReceived} from "Common/Domain/RequestHandling/Base/Http/Event/HttpSuccessResponseWasReceived";

export enum HttpRequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type HttpResponse<ResponseBody = object> = {
    statusCode: number,
    body: ResponseBody,
};

export type HttpRequest = {
    method: HttpRequestMethods,
    id: string,
    url: string,
    queryParameters: object,
    headers: object,
    body: (undefined | object),
    isLoaderEnabled: boolean,
};

export type HttpRequestResponse<ResponseBody = object> = {
    request: HttpRequest,
    response?: HttpResponse<ResponseBody>,
};

export type SuccessHttpRequestResponse<ResponseBody = object> = Required<HttpRequestResponse<ResponseBody>>;

export type HttpState = {
    runningHttpRequests: HttpRequest[],
}

export enum HttpEventTypes {
    HTTP_REQUEST_WAS_SENT = 'HTTP_REQUEST_WAS_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc',
    HTTP_REQUEST_WAS_NOT_SENT = 'HTTP_REQUEST_WAS_NOT_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc',
    HTTP_SUCCESS_RESPONSE_WAS_RECEIVED = 'HTTP_SUCCESS_RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc',
    HTTP_ERROR_RESPONSE_WAS_RECEIVED = 'HTTP_ERROR_RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc',
    HTTP_REQUEST_FAILED = 'HTTP_REQUEST_FAILED-27fd0173-f640-46ce-8881-516cdf5c41fc',
    HTTP_REQUEST_WAS_CANCELLED = 'HTTP_REQUEST_WAS_CANCELLED-27fd0173-f640-46ce-8881-516cdf5c41fc',
}

export type HttpEvent = (
    HttpRequestWasSent
    | HttpRequestWasNotSent
    | HttpSuccessResponseWasReceived
    | HttpErrorResponseWasReceived
    | HttpRequestFailed
    | HttpRequestWasCancelled
);

export type HttpStateSelector<State = any> = (state: State) => HttpState

export enum HttpRequestHandlerCommandTypes {
    SEND_HTTP_REQUEST = 'SEND_HTTP_REQUEST-639d43a1-e8dd-426d-a868-5079aa60d064',
}