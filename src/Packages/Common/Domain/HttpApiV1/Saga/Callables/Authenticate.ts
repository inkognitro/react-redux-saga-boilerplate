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
import { FieldPathMessage } from "Packages/Common/Domain/Form/Types";
import { Message } from "Entity/Domain/Message";
import { AuthUser } from "Packages/Common/Domain/Authentication/Types";

export type AuthenticateResult = {
    successData?: {
        generalMessages: Message[]
        authUser: AuthUser
    },
    errorData?: {
        generalMessages?: Message[]
        fieldMessages?: FieldPathMessage[]
    },
};

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
        return {};
    }
    const baseResult = {
        generalMessages: (response.body.generalMessages ? response.body.generalMessages : []),
        fieldMessages: (response.body.fieldMessages ? response.body.fieldMessages : []),
    };
    if (response.statusCode === 200) {
        return {
            successData: {
                ...baseResult,
                authUser: {
                    token: response.body.data.token,
                    user: response.body.data.user,
                },
            },
        };
    }
    return {
        errorData: baseResult,
    };
}
