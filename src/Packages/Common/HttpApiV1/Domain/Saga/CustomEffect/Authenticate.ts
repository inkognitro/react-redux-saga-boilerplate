import { User } from "Packages/Entity/User";
import { createPostRequest, HttpStatusCodes, Request } from "Packages/Common/HttpFoundation";
import { AuthUser } from "Packages/Common/Authentication";
import {
    SuccessResult,
    ErrorResult,
    createErrorResult,
    createSuccessResult,
} from "Packages/Common/CommonTypes";
import { ApiV1ReadResponse } from "../../Types";
import { apiV1BaseUrl, executeRequest } from "./InternalRequestHandling";

type AuthApiResponse = ApiV1ReadResponse<{user: User, token: string}>;

export type AuthenticateSettings = {
    username: string
    password: string
};

export type AuthenticateResult = (SuccessResult<{ authUser: AuthUser }> | ErrorResult);

export function* authenticate(settings: AuthenticateSettings): Generator<unknown, AuthenticateResult> {
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
    if (response.statusCode === HttpStatusCodes.OK) {
        return createSuccessResult({
            generalMessages: response.body.generalMessages,
            fieldMessages: response.body.fieldMessages,
            data: {
                authUser: {
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
