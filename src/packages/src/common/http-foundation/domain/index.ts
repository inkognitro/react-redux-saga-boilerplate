import {
    Request as RequestType,
    HttpRequestDispatcher as HttpRequestDispatcherType,
    RequestResponse as RequestResponseType,
    HttpFoundationState as HttpFoundationStateType,
    HttpFoundationStateSelector as HttpFoundationStateSelectorType,
    Response as ResponseType,
} from './types';
import { ExecuteRequestCallEffect as ExecuteRequestCallEffectType } from './saga/effect/execute.request';
import { ReceiveHttpResponseGenerator as ReceiveHttpResponseGeneratorType } from './saga/effect/receive.response';
import {
    HttpErrorResponseWasReceived as HttpErrorResponseWasReceivedType,
    HttpRequestFailed as HttpRequestFailedType,
    HttpRequestWasCancelled as HttpRequestWasCancelledType,
    HttpRequestWasNotSent as HttpRequestWasNotSentType,
    HttpRequestWasSent as HttpRequestWasSentType,
    HttpSuccessResponseWasReceived as HttpSuccessResponseWasReceivedType,
} from "./event";
import { SendHttpRequest as SendHttpRequestType } from "./command";

export type Request = RequestType;
export type HttpRequestDispatcher = HttpRequestDispatcherType;
export type RequestResponse<ResponseBody = {}> = RequestResponseType<ResponseBody>;
export type HttpFoundationState = HttpFoundationStateType;
export type HttpFoundationStateSelector = HttpFoundationStateSelectorType;
export type Response<ResponseBody = {}> = ResponseType<ResponseBody>;
export type ExecuteRequestCallEffect<SpecificResponse> = ExecuteRequestCallEffectType<SpecificResponse>;
export type ReceiveHttpResponseGenerator<SpecificResponse> = ReceiveHttpResponseGeneratorType<SpecificResponse>;
export type SendHttpRequest = SendHttpRequestType;
export type HttpRequestWasCancelled = HttpRequestWasCancelledType;
export type HttpRequestFailed = HttpRequestFailedType;
export type HttpRequestWasNotSent = HttpRequestWasNotSentType;
export type HttpErrorResponseWasReceived = HttpErrorResponseWasReceivedType;
export type HttpSuccessResponseWasReceived = HttpSuccessResponseWasReceivedType;
export type HttpRequestWasSent = HttpRequestWasSentType;

export {
    HttpStatusCodes,
    RequestMethods,
} from './types';
export { executeRequest } from './saga/effect/execute.request';
export { receiveResponse } from './saga/effect/receive.response';
export { createHttpFoundationSaga } from './saga/flow';
export {
    createGetRequest,
    createPatchRequest,
    createDeleteRequest,
    createPutRequest,
    createPostRequest,
    getWithHeaderEnhancedHttpRequest,
} from './request.factory';
export { httpFoundationReducer } from './reducer';
export { HttpEventTypes } from "./event";
export { HttpFoundationCommandTypes, createSendHttpRequest } from "./command";
