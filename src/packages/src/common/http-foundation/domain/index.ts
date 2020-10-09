import {
    Request as RequestType,
    HttpRequestDispatcher as HttpRequestDispatcherType,
    RequestResponse as RequestResponseType,
    HttpFoundationState as HttpFoundationStateType,
    HttpFoundationStateSelector as HttpFoundationStateSelectorType,
    Response as ResponseType,
} from './types';

export type Request<Q extends object = {}, B extends object = {}, H extends object = {}> = RequestType<Q, B, H>;
export type HttpRequestDispatcher = HttpRequestDispatcherType;
export type RequestResponse<R extends Response = any> = RequestResponseType<R>;
export type HttpFoundationState = HttpFoundationStateType;
export type HttpFoundationStateSelector = HttpFoundationStateSelectorType;
export type Response<B extends object = {}> = ResponseType<B>;

export { HttpStatusCodes, RequestMethods } from './types';
export { executeRequest } from './saga/effect';
export { createHttpFoundationSaga } from './saga/flow';
export {
    createGetRequest,
    createPostRequest,
    createPatchRequest,
    createPutRequest,
    createDeleteRequest,
} from './request.factory';
export { httpFoundationReducer } from './reducer';
