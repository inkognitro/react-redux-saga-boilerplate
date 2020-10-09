import { RequestMethods } from "packages/common/http-foundation/domain";

export enum EndpointUrlPaths {
    AUTHENTICATE = '/auth/authenticate',
    REFRESH_AUTHENTICATION = '/auth/refresh',
}

export type EndpointSchema<UP extends EndpointUrlPaths = any> = {
    urlPath: UP
    method: RequestMethods
}
