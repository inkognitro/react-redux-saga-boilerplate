import {HttpRequestWasSent} from "Common/RequestHandler/Domain/Event/HttpRequestWasSent";
import {HttpRequestWasFinished} from "Common/RequestHandler/Domain/Event/HttpRequestWasFinished";

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

export type RequestHandlerState = {
    runningHttpRequests: HttpRequest[],
}

export enum RequestHandlerEventTypes {
    HTTP_REQUEST_WAS_SENT = 'HTTP_REQUEST_WAS_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc',
    HTTP_REQUEST_WAS_FINISHED = 'HTTP_REQUEST_WAS_FINISHED-27fd0173-f640-46ce-8881-516cdf5c41fc',
}

export type RequestHandlerEvent = (HttpRequestWasSent | HttpRequestWasFinished);

export type RequestHandlerStateSelector<State = any> = (state: State) => RequestHandlerState
