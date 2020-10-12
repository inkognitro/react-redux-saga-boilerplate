import { RequestMethods } from 'packages/common/http-foundation/domain';
import { EndpointSchema, EndpointUrlPaths } from './types';

export const authenticateEndpointSchema: EndpointSchema = {
    method: RequestMethods.POST,
    urlPath: EndpointUrlPaths.AUTHENTICATE,
};

export const refreshAuthenticationEndpointSchema: EndpointSchema = {
    method: RequestMethods.POST,
    urlPath: EndpointUrlPaths.REFRESH_AUTHENTICATION,
};
