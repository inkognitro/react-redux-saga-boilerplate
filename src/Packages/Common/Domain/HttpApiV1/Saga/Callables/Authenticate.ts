import { apiV1BaseUrl } from "Packages/Common/Domain/HttpApiV1/HttpApiV1";
import { ApiV1ReadResponse } from "Packages/Common/Domain/HttpApiV1/Types";
import { User } from "Entity/Domain/User";
import { call, put } from "redux-saga/effects";
import { createPostRequest } from "Packages/Common/Domain/HttpFoundation/Command/RequestFactory";
import { Request } from "Packages/Common/Domain/HttpFoundation/Types";
import { createSendHttpRequest } from "Packages/Common/Domain/HttpApiV1/Command/SendHttpRequest";
import {
    receiveHttpResponse,
} from "Packages/Common/Domain/HttpFoundation/Saga/Callables/HttpResponseReceiving";
import { AuthUser } from "Packages/Common/Domain/Authentication/Types";
import { ResultWithMessages } from "Packages/Common/Domain/Types";

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
