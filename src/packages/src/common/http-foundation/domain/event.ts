import { Event } from "packages/common/types/util/domain";
import { Request, Response } from "./types";

export enum HttpFoundationEventTypes {
    REQUEST_WAS_SENT = "REQUEST_WAS_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc",
    REQUEST_WAS_NOT_SENT = "REQUEST_WAS_NOT_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc",
    RESPONSE_WAS_RECEIVED = "RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc",
    RESPONSE_COULD_NOT_BE_RECEIVED = "REQUEST_COULD_NOT_BE_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc",
    REQUEST_WAS_CANCELLED = "REQUEST_WAS_CANCELLED-27fd0173-f640-46ce-8881-516cdf5c41fc",
}

export type ResponseCouldNotBeReceived = Event<HttpFoundationEventTypes.RESPONSE_COULD_NOT_BE_RECEIVED, { request: Request }>
export function createResponseCouldNotBeReceived(request: Request): ResponseCouldNotBeReceived {
    return {
        type: HttpFoundationEventTypes.RESPONSE_COULD_NOT_BE_RECEIVED,
        payload: { request },
    };
}

export type RequestWasCancelled = Event<HttpFoundationEventTypes.REQUEST_WAS_CANCELLED, { request: Request }>
export function createRequestWasCancelled(request: Request): RequestWasCancelled {
    return {
        type: HttpFoundationEventTypes.REQUEST_WAS_CANCELLED,
        payload: { request },
    };
}

export enum Reasons {
    REQUEST_WITH_SAME_ID_IS_ALREADY_RUNNING = "requestWithSameIdIsAlreadyRunning",
}

export type RequestWasNotSent = Event<HttpFoundationEventTypes.REQUEST_WAS_NOT_SENT, { request: Request, reason: Reasons }>
export function createRequestWasNotSent(request: Request, reason: Reasons): RequestWasNotSent {
    return {
        type: HttpFoundationEventTypes.REQUEST_WAS_NOT_SENT,
        payload: { request, reason },
    };
}

export type RequestWasSent = Event<HttpFoundationEventTypes.REQUEST_WAS_SENT, { request: Request }>
export function createRequestWasSent(request: Request): RequestWasSent {
    return {
        type: HttpFoundationEventTypes.REQUEST_WAS_SENT,
        payload: { request },
    };
}

export type ResponseWasReceived = Event<HttpFoundationEventTypes.RESPONSE_WAS_RECEIVED, { request: Request; response: Response }>
export function createResponseWasReceived(request: Request, response: Response): ResponseWasReceived {
    return {
        type: HttpFoundationEventTypes.RESPONSE_WAS_RECEIVED,
        payload: { request, response },
    };
}
