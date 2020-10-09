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

type AuthApiResponse = ApiV1ReadResponse<{user: User, token: string}>;

export type AuthenticateSettings = {
    username: string
    password: string
};

export type AuthenticateResult = (SuccessResult<{ authUser: AuthenticatedAuthUser }> | ErrorResult);

export function* authenticateAtEndpoint(settings: AuthenticateSettings): Generator<unknown, AuthenticateResult> {
    const request: Request = createPostRequest({
        url: `${apiV1BaseUrl}/auth/authenticate`,
        body: {
            username: settings.username,
            password: settings.password,
        },
    });
    // @ts-ignore
    const response: (null | AuthApiResponse) = yield executeRequest<AuthApiResponse>(request);
    if (!response) {
        return createErrorResult({
            data: undefined,
        });
    }
    if (response.headers.statusCode === HttpStatusCodes.OK) {
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
