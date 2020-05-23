import { apiV1BaseUrl, ApiV1ReadResponse, createSendHttpRequest } from "Packages/Common/HttpApiV1";
import { User } from "Packages/Entity/User";
import { call, put } from "redux-saga/effects";
import { createPostRequest, Request, receiveHttpResponse } from "Packages/Common/HttpFoundation";
import { AuthUser } from "Packages/Common/Authentication";
import { ResultWithMessages } from "Packages/Common/CommonTypes";

export type AuthenticateResult = (null | ResultWithMessages<{
    authUser?: AuthUser
}>);

type AuthSettings = {
    username: string
    password: string
};

export function* authenticate(settings: AuthSettings): Generator<unknown, AuthenticateResult> {
    const request: Request = createPostRequest({
        url: `${apiV1BaseUrl}/auth/authenticate`,
        body: {
            username: settings.username,
            password: settings.password,
        },
    });
    yield put(createSendHttpRequest(request));
    // @ts-ignore
    const response: ApiV1ReadResponse<{user: User, token: string}> = yield call(receiveHttpResponse, request);
    if (!response) {
        return null;
    }
    const baseResult = {
        generalMessages: (response.body.generalMessages ? response.body.generalMessages : []),
        fieldMessages: (response.body.fieldMessages ? response.body.fieldMessages : []),
    };
    if (response.statusCode === 200) {
        return {
            ...baseResult,
            data: {
                authUser: {
                    token: response.body.data.token,
                    user: response.body.data.user,
                },
            },
        };
    }
    return {
        ...baseResult,
        data: {},
    };
}
