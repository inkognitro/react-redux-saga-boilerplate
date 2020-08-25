import {
    Request as RequestType,
    HttpRequestDispatcher as HttpRequestDispatcherType,
    RequestResponse as RequestResponseType,
    HttpFoundationState as HttpFoundationStateType,
    HttpFoundationStateSelector as HttpFoundationStateSelectorType,
    Response as ResponseType,
} from './Types';
import { ExecuteRequestCallEffect as ExecuteRequestCallEffectType } from './Saga/CustomEffect/RequestHandling';
import { ReceiveHttpResponseGenerator as ReceiveHttpResponseGeneratorType } from './Saga/CustomEffect/ResponseReceiving';
import { SendHttpRequest as SendHttpRequestType } from './Command/SendHttpRequest';
import { HttpRequestWasCancelled as HttpRequestWasCancelledType } from './Event/HttpRequestWasCancelled';
import { HttpRequestFailed as HttpRequestFailedType } from './Event/HttpRequestFailed';
import { HttpRequestWasNotSent as HttpRequestWasNotSentType } from './Event/HttpRequestWasNotSent';
import { HttpErrorResponseWasReceived as HttpErrorResponseWasReceivedType } from './Event/HttpErrorResponseWasReceived';
import {
    HttpSuccessResponseWasReceived as HttpSuccessResponseWasReceivedType,
} from './Event/HttpSuccessResponseWasReceived';
import { HttpRequestWasSent as HttpRequestWasSentType } from './Event/HttpRequestWasSent';

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
} from './Types';
export { executeRequest } from './Saga/CustomEffect/RequestHandling';
export { receiveResponse } from './Saga/CustomEffect/ResponseReceiving';
export { createHttpFoundationSaga } from './Saga/Flow';
export { createSendHttpRequest } from './Command/SendHttpRequest';
export {
    createGetRequest,
    createPatchRequest,
    createDeleteRequest,
    createPutRequest,
    createPostRequest,
    getWithHeaderEnhancedHttpRequest,
} from './RequestFactory';
export { httpFoundationReducer } from './Reducer';
export { HttpEventTypes } from "./Event/Types";
export { HttpFoundationCommandTypes } from "./Command/Types";
