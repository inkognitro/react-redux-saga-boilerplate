import { User } from "packages/entity/user/domain";
import { createPostRequest, HttpStatusCodes, Request } from "packages/common/http-foundation/domain";
import { AuthenticatedAuthUser, AuthUserTypes } from "packages/entity/auth-user/domain";
import {
    SuccessResult,
    ErrorResult,
    createErrorResult,
    createSuccessResult,
} from "packages/entity/common-types";
import { ApiV1ReadResponse } from "../../types";
import { apiV1BaseUrl, executeRequest } from "./execute.request";

type EndpointResponse = ApiV1ReadResponse<{user: User, token: string}>;

export type AuthenticationRefreshSettings = {
    token: string
};

export type AuthenticationRefreshResult = (SuccessResult<{ authUser: AuthenticatedAuthUser }> | ErrorResult);

export function* refreshAuthenticationAtEndpoint(
    settings: AuthenticationRefreshSettings,
): Generator<unknown, AuthenticationRefreshResult> {
    const request: Request = createPostRequest({
        url: `${apiV1BaseUrl}/auth/refreshauthentication`,
        body: {
            token: settings.token,
        },
    });
    // @ts-ignore
    const response: (null | EndpointResponse) = yield executeRequest<EndpointResponse>(request);
    if (!response) {
        return createErrorResult({
            data: undefined,
        });
    }
    if (response.header.statusCode === HttpStatusCodes.OK) {
        return createSuccessResult<{ authUser: AuthenticatedAuthUser }>({
            generalMessages: response.body.generalMessages,
            fieldMessages: response.body.fieldMessages,
            data: {
                authUser: {
                    type: AuthUserTypes.AUTHENTICATED_USER,
                    token: response.body.data.token,
                    user: response.body.data.user,
                },
            },
        });
    }
    return createErrorResult({
        generalMessages: response.body.generalMessages,
        fieldMessages: response.body.fieldMessages,
        data: undefined,
    });
}
