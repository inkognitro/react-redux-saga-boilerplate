import {
    HttpApiV1State as HttpApiV1StateType,
    HttpApiV1StateSelector as HttpApiV1StateSelectorType,
    ApiV1Response as ApiV1ResponseType,
} from './types';
import { AuthenticateResult as AuthenticateResultType } from './endpoint/auth/authenticate.endpoint';
import { AuthenticationRefreshResult as AuthenticationRefreshResultType } from './endpoint/auth/refresh.authentication.endpoint';

export type HttpApiV1State = HttpApiV1StateType;
export type HttpApiV1StateSelector = HttpApiV1StateSelectorType;
export type ApiV1Response<Body extends object = {}> = ApiV1ResponseType<Body>;

export type AuthenticateResult = AuthenticateResultType;
export { callAuthenticateEndpoint } from './endpoint/auth/authenticate.endpoint';

export type AuthenticationRefreshResult = AuthenticationRefreshResultType;
export { callRefreshAuthenticationEndpoint } from './endpoint/auth/refresh.authentication.endpoint';

export { createHttpApiV1Saga } from './saga/flow';
export { initializeHttpApiV1 } from './saga/effect';
export { httpApiV1Reducer } from './reducer';
export { HttpApiV1EventTypes } from './event';
