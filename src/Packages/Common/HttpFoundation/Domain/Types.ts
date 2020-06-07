import {
    HttpRequestWasSent,
    HttpErrorResponseWasReceived,
    HttpRequestFailed,
    HttpRequestWasCancelled,
    HttpRequestWasNotSent,
    HttpSuccessResponseWasReceived,
} from "Packages/Common/HttpFoundation";

export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum HttpStatusCodes {
    OK = 200,
}

export type Response<ResponseBody = {}> = {
    header: {
        statusCode: number
    }
    body: ResponseBody
};

export type Request = {
  method: RequestMethods
  id: string
  url: string
  queryParameters: object
  header: object
  body: undefined | object
};

export type RequestResponse<ResponseBody = {}> = {
  request: Request
  response?: Response<ResponseBody>
};

export type HttpFoundationState = {
  runningHttpRequests: Request[]
};

export enum HttpEventTypes {
  HTTP_REQUEST_WAS_SENT = "HTTP_REQUEST_WAS_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc",
  HTTP_REQUEST_WAS_NOT_SENT = "HTTP_REQUEST_WAS_NOT_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc",
  HTTP_SUCCESS_RESPONSE_WAS_RECEIVED = "HTTP_SUCCESS_RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc",
  HTTP_ERROR_RESPONSE_WAS_RECEIVED = "HTTP_ERROR_RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc",
  HTTP_REQUEST_FAILED = "HTTP_REQUEST_FAILED-27fd0173-f640-46ce-8881-516cdf5c41fc",
  HTTP_REQUEST_WAS_CANCELLED = "HTTP_REQUEST_WAS_CANCELLED-27fd0173-f640-46ce-8881-516cdf5c41fc",
}

export type HttpEvent = (
  | HttpRequestWasSent
  | HttpRequestWasNotSent
  | HttpSuccessResponseWasReceived
  | HttpErrorResponseWasReceived
  | HttpRequestFailed
  | HttpRequestWasCancelled
);

export type HttpFoundationStateSelector<State = any> = (state: State) => HttpFoundationState;

export enum HttpFoundationCommandTypes {
  SEND_HTTP_REQUEST = "SEND_HTTP_REQUEST-639d43a1-e8dd-426d-a868-5079aa60d064",
}

export interface HttpRequestDispatcher {
  executeRequest(request: Request): Promise<RequestResponse>;
}
