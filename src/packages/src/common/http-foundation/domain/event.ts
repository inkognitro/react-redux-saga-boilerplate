import { Event } from "packages/entity/common-types";
import { Request, Response } from "./types";

export enum HttpEventTypes {
    HTTP_REQUEST_WAS_SENT = "HTTP_REQUEST_WAS_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc",
    HTTP_REQUEST_WAS_NOT_SENT = "HTTP_REQUEST_WAS_NOT_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc",
    HTTP_SUCCESS_RESPONSE_WAS_RECEIVED = "HTTP_SUCCESS_RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc",
    HTTP_ERROR_RESPONSE_WAS_RECEIVED = "HTTP_ERROR_RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc",
    HTTP_REQUEST_FAILED = "HTTP_REQUEST_FAILED-27fd0173-f640-46ce-8881-516cdf5c41fc",
    HTTP_REQUEST_WAS_CANCELLED = "HTTP_REQUEST_WAS_CANCELLED-27fd0173-f640-46ce-8881-516cdf5c41fc",
}

export function createHttpErrorResponseWasReceived(
    request: Request,
    response: Response,
): HttpErrorResponseWasReceived {
    return {
        type: HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
        payload: { request, response },
    };
}

export type HttpErrorResponseWasReceived<ResponseBody = any> = Event<HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
    {
        request: Request;
        response: Response<ResponseBody>;
    }>;

export function createHttpRequestFailed(
    request: Request,
): HttpRequestFailed {
    return {
        type: HttpEventTypes.HTTP_REQUEST_FAILED,
        payload: { request },
    };
}

export type HttpRequestFailed = Event<HttpEventTypes.HTTP_REQUEST_FAILED, {
    request: Request;
}>;

export function createHttpRequestWasCancelled(
    request: Request,
): HttpRequestWasCancelled {
    return {
        type: HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
        payload: { request },
    };
}

export type HttpRequestWasCancelled = Event<HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
    {
        request: Request;
    }>;

export enum Reasons {
    REQUEST_WITH_SAME_ID_IS_ALREADY_RUNNING = "requestWithSameIdIsAlreadyRunning",
}

export function createHttpRequestWasNotSent(
    request: Request,
    reason: Reasons,
): HttpRequestWasNotSent {
    return {
        type: HttpEventTypes.HTTP_REQUEST_WAS_NOT_SENT,
        payload: { request, reason },
    };
}

export type HttpRequestWasNotSent = Event<HttpEventTypes.HTTP_REQUEST_WAS_NOT_SENT, {
    request: Request;
    reason: Reasons;
}>;

export function createRequestWasSent(request: Request): HttpRequestWasSent {
    return {
        type: HttpEventTypes.HTTP_REQUEST_WAS_SENT,
        payload: {
            request,
        },
    };
}

export type HttpRequestWasSent = Event<HttpEventTypes.HTTP_REQUEST_WAS_SENT,
    {
        request: Request;
    }>;

export function createHttpSuccessResponseWasReceived(
    request: Request,
    response: Response,
): HttpSuccessResponseWasReceived {
    return {
        type: HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
        payload: { request, response },
    };
}

export type HttpSuccessResponseWasReceived<ResponseBody = any> = Event<HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
    {
        request: Request;
        response: Response<ResponseBody>;
    }>;
