import { apiV1BaseUrl } from "Packages/Common/HttpApiV1";
import { ApiV1ReadResponse } from "Packages/Common/HttpApiV1/Domain/Types";
import { User } from "Packages/Entity/User/Domain/User";
import { call, put } from "redux-saga/effects";
import { createPostRequest } from "Packages/Common/HttpFoundation/Domain/Command/RequestFactory";
import { Request } from "Packages/Common/HttpFoundation/Domain/Types";
import { createSendHttpRequest } from "Packages/Common/HttpApiV1/Domain/Command/SendHttpRequest";
import {
    receiveHttpResponse,
} from "Packages/Common/HttpFoundation/Domain/Saga/Callables/HttpResponseReceiving";
import { AuthUser } from "Packages/Common/Authentication/Domain/Types";
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
