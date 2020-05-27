import { User } from "Packages/Entity/User";
import { createPostRequest, HttpStatusCodes, Request } from "Packages/Common/HttpFoundation";
import { AuthUser } from "Packages/Common/Authentication";
import { BusinessLogicResult, createBusinessLogicResult, ResultTypes } from "Packages/Common/BusinessLogicResult";
import { ApiV1ReadResponse } from "../../Types";
import { apiV1BaseUrl, executeRequest } from "./InternalRequestHandling";

type AuthApiResponse = ApiV1ReadResponse<{user: User, token: string}>;

export type AuthenticateSettings = {
    username: string
    password: string
};

type ResultData = { authUser?: AuthUser }
export type AuthenticateResult = BusinessLogicResult<ResultData>;

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
        return createBusinessLogicResult<ResultData>({
            type: ResultTypes.ERROR,
        });
    }
    if (response.statusCode === HttpStatusCodes.OK) {
        return createBusinessLogicResult<ResultData>({
            type: ResultTypes.SUCCESS,
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
    return createBusinessLogicResult<ResultData>({
        type: ResultTypes.ERROR,
        generalMessages: response.body.generalMessages,
        fieldMessages: response.body.fieldMessages,
    });
}
