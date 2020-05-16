import { apiV1BaseUrl } from "Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http";
import { ApiV1ReadResponse } from "Common/Domain/RequestHandling/ApiV1/Http/Types";
import { User } from "Common/Domain/Model/User";
import { call, put } from "redux-saga/effects";
import { createPostRequest } from "Common/Domain/RequestHandling/Base/Http/Command/RequestFactory";
import { HttpRequest } from "Common/Domain/RequestHandling/Base/Http/Types";
import { createSendHttpRequest } from "Common/Domain/RequestHandling/ApiV1/Http/Command/SendHttpRequest";
import {
    receiveHttpResponse,
} from "Common/Domain/RequestHandling/Base/Http/Saga/HttpResponseReceiving";

export enum ResponseDataTypes {
  SUCCESS = "success",
  ERROR = "error",
}

export type Result = {
    successData?: {
        token: string;
        user: User;
    },
    errorData?: {},
};

type AuthSettings = {
    username: string
    password: string
};

export function* authenticate(settings: AuthSettings): Generator<unknown, Result> {
    const request: HttpRequest = createPostRequest({
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
    if (response.statusCode === 200) {
        return {
            successData: {
                token: response.body.data.token,
                user: response.body.data.user,
            },
        };
    }
    return {
        errorData: {},
    };
}
