import { ApiV1ReadResponse as ApiV1ReadResponseType } from './types';
import { AuthenticateResult as AuthenticateResultType } from './saga/effect/authenticate.at.endpoint';
import { AuthenticationRefreshResult as AuthenticationRefreshResultType } from './saga/effect/refresh.authentication.endpoint';
import { SendHttpRequest as SendHttpRequestType } from "./command";
import {
    ApiV1HttpConnectionFailed as ApiV1HttpConnectionFailedType,
    ApiV1HttpResponseWasReceived as ApiV1HttpResponseWasReceivedType,
} from "./event";

export type AuthenticateResult = AuthenticateResultType;
export type AuthenticationRefreshResult = AuthenticationRefreshResultType;
export type ApiV1HttpConnectionFailed = ApiV1HttpConnectionFailedType;
export type ApiV1HttpResponseWasReceived = ApiV1HttpResponseWasReceivedType;
export type ApiV1ReadResponse<Data = {}> = ApiV1ReadResponseType<Data>;
export type SendHttpRequest = SendHttpRequestType;

export { createHttpApiV1Saga } from './saga/flow';
export { authenticateAtEndpoint } from './saga/effect/authenticate.at.endpoint';
export { refreshAuthenticationAtEndpoint } from './saga/effect/refresh.authentication.endpoint';
export { createSendHttpRequest } from "./command";
export { HttpApiV1EventTypes } from "./event";
