import { StrictEffect } from 'redux-saga/effects';
import { MinimalUser } from 'packages/common/types/user/domain';
import { createErrorResult, createSuccessResult, ErrorResult, SuccessResult } from 'packages/common/types/util/domain';
import { HttpStatusCodes } from 'packages/common/http-foundation/domain';
import { ApiV1Request, ApiV1RequestResponse, ApiV1Response } from '../../types';
import { createApiV1SingleRequest } from '../../request.factory';
import { refreshAuthenticationEndpointSchema } from '../schema';
import { executeRequest } from '../../saga/effect';

type EndpointResponse = ApiV1Response<{
    data: { token: string; user: MinimalUser };
}>;
type SuccessResultData = { token: string; user: MinimalUser };
export type AuthenticationRefreshResult = SuccessResult<SuccessResultData> | ErrorResult;

type ExecutionSettings = { token: string };

export function* callRefreshAuthenticationEndpoint(
    settings: ExecutionSettings
): Generator<StrictEffect, AuthenticationRefreshResult> {
    const request = createApiV1SingleRequest({
        endpoint: refreshAuthenticationEndpointSchema,
        body: { token: settings.token },
    });
    // @ts-ignore
    const requestResponse: ApiV1RequestResponse<ApiV1Request, EndpointResponse> = yield executeRequest(request);
    const { response } = requestResponse;
    if (!response) {
        return createErrorResult({ data: undefined });
    }
    if (response.headers.statusCode !== HttpStatusCodes.OK) {
        return createErrorResult({
            generalMessages: response.body.generalMessages,
            fieldMessages: response.body.fieldMessages,
            data: undefined,
        });
    }
    return createSuccessResult<SuccessResultData>({
        generalMessages: response.body.generalMessages,
        fieldMessages: response.body.fieldMessages,
        data: {
            token: response.body.data.token,
            user: response.body.data.user,
        },
    });
}
