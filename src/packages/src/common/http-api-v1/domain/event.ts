import { Event } from 'packages/common/types/util/domain';
import { ApiV1Request, ApiV1Response } from './types';

export enum HttpApiV1EventTypes {
    HTTP_API_V1_WAS_INITIALIZED = 'HTTP_API_V1_WAS_INITIALIZED-47406dac-1dc9-4831-a20a-ac917a944ddb',
    RESPONSE_WAS_RECEIVED = 'RESPONSE_WAS_RECEIVED-47406dac-1dc9-4831-a20a-ac917a944ddb',
    RESPONSE_COULD_NOT_BE_RECEIVED = 'RESPONSE_COULD_NOT_BE_RECEIVED-47406dac-1dc9-4831-a20a-ac917a944ddb',
}

export type HttpApiV1WasInitialized = Event<HttpApiV1EventTypes.HTTP_API_V1_WAS_INITIALIZED, { baseUrl: string }>;
export function createHttpApiV1WasInitialized(baseUrl: string): HttpApiV1WasInitialized {
    return {
        type: HttpApiV1EventTypes.HTTP_API_V1_WAS_INITIALIZED,
        payload: { baseUrl },
    };
}

export type ResponseWasReceived = Event<
    HttpApiV1EventTypes.RESPONSE_WAS_RECEIVED,
    {
        request: ApiV1Request;
        response: ApiV1Response;
    }
>;
export function createResponseWasReceived(request: ApiV1Request, response: ApiV1Response): ResponseWasReceived {
    return {
        type: HttpApiV1EventTypes.RESPONSE_WAS_RECEIVED,
        payload: { request, response },
    };
}

export type ResponseCouldNotBeReceived = Event<
    HttpApiV1EventTypes.RESPONSE_COULD_NOT_BE_RECEIVED,
    { request: ApiV1Request }
>;
export function createResponseCouldNotBeReceived(request: ApiV1Request): ResponseCouldNotBeReceived {
    return {
        type: HttpApiV1EventTypes.RESPONSE_COULD_NOT_BE_RECEIVED,
        payload: { request },
    };
}
