import {
    Request as RequestType,
    HttpRequestDispatcher as HttpRequestDispatcherType,
    RequestResponse as RequestResponseType,
    HttpEvent as HttpEventType,
    HttpFoundationState as HttpFoundationStateType,
    HttpFoundationStateSelector as HttpFoundationStateSelectorType,
    Response as ResponseType,
} from './Domain/Types';
import { ExecuteRequestCallEffect as ExecuteRequestCallEffectType } from './Domain/Saga/CustomEffect/RequestHandling';
import { ReceiveHttpResponseGenerator as ReceiveHttpResponseGeneratorType } from './Domain/Saga/CustomEffect/ResponseReceiving';
import { SendHttpRequest as SendHttpRequestType } from './Domain/Command/SendHttpRequest';
import { HttpRequestWasCancelled as HttpRequestWasCancelledType } from './Domain/Event/HttpRequestWasCancelled';
import { HttpRequestFailed as HttpRequestFailedType } from './Domain/Event/HttpRequestFailed';
import { HttpRequestWasNotSent as HttpRequestWasNotSentType } from './Domain/Event/HttpRequestWasNotSent';
import { HttpErrorResponseWasReceived as HttpErrorResponseWasReceivedType } from './Domain/Event/HttpErrorResponseWasReceived';
import {
    HttpSuccessResponseWasReceived as HttpSuccessResponseWasReceivedType,
} from './Domain/Event/HttpSuccessResponseWasReceived';
import { HttpRequestWasSent as HttpRequestWasSentType } from './Domain/Event/HttpRequestWasSent';

export type Request = RequestType;
export type HttpRequestDispatcher = HttpRequestDispatcherType;
export type RequestResponse<ResponseBody = {}> = RequestResponseType<ResponseBody>;
export type HttpEvent = HttpEventType;
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
    HttpEventTypes,
    HttpFoundationCommandTypes,
    RequestMethods,
} from './Domain/Types';
export { executeRequest } from './Domain/Saga/CustomEffect/RequestHandling';
export { receiveResponse } from './Domain/Saga/CustomEffect/ResponseReceiving';
export { createHttpFoundationSaga } from './Domain/Saga/Flow';
export { createSendHttpRequest } from './Domain/Command/SendHttpRequest';
export {
    createGetRequest,
    createPatchRequest,
    createDeleteRequest,
    createPutRequest,
    createPostRequest,
    getWithHeaderEnhancedHttpRequest,
} from './Domain/Command/RequestFactory';
export { httpFoundationReducer } from './Domain/Reducer';
export { AxiosHttpRequestDispatcher } from './Infrastructure/AxiosHttpRequestDispatcher';
export { MockHttpRequestDispatcher } from './Infrastructure/MockHttpRequestDispatcher';
