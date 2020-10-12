import { v4 as uuidV4 } from 'uuid';
import { Request } from 'packages/common/http-foundation/domain';
import { EndpointSchema } from './endpoint/types';
import { ApiV1Request, ApiV1RequestTypes, ApiV1SingleRequest } from './types';

type SingleRequestCreationSettings<Q, B> = {
    endpoint: EndpointSchema;
    queryParameters?: Q;
    body?: B;
};

export function createApiV1SingleRequest<Q extends object = any, B extends object = any>(
    settings: SingleRequestCreationSettings<Q, B>
): ApiV1SingleRequest {
    return {
        id: uuidV4(),
        type: ApiV1RequestTypes.SINGLE_REQUEST,
        payload: {
            endpoint: settings.endpoint,
            queryParameters: settings.queryParameters ? settings.queryParameters : {},
            body: settings.body ? settings.body : {},
        },
    };
}

type FoundationRequestCreationSettings = {
    baseUrl: string;
    request: ApiV1Request;
    token?: string;
};

export function createFoundationRequestFromApiV1Request(settings: FoundationRequestCreationSettings): Request {
    const headers = !settings.token ? {} : { 'X-API-TOKEN': settings.token };
    if (settings.request.type === ApiV1RequestTypes.SINGLE_REQUEST) {
        const { endpoint } = settings.request.payload;
        return {
            id: uuidV4(),
            url: `${settings.baseUrl}${endpoint.urlPath}`,
            method: endpoint.method,
            headers,
            body: settings.request.payload.body,
            queryParameters: settings.request.payload.queryParameters,
        };
    }
    throw new Error(`Request with type "${settings.request.type}" not supported!`);
}
