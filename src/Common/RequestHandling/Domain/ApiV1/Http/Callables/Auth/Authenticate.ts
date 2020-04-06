import {apiV1BaseUrl, ApiV1CommandTypes} from "Common/RequestHandling/Domain/ApiV1/Http/ApiV1Http";
import {BasicResponseBody, ReadResponseBody} from "Common/RequestHandling/Domain/ApiV1/Http/Types";
import {User} from "Common/Model/Domain/User";
import {Command} from "Common/Bootstrap/Domain/Command";
import {call, put} from "@redux-saga/core/effects";
import {createPostRequest} from "Common/RequestHandling/Domain/Base/Http/Command/RequestFactory";
import {HttpRequest, HttpResponse} from "Common/RequestHandling/Domain/Base/Http/Types";
import {createSendHttpRequest} from "Common/RequestHandling/Domain/ApiV1/Http/Command/SendHttpRequest";
import {findHttpResponse} from "Common/RequestHandling/Domain/Base/Http/Callables/HttpResponse";

export type AuthenticateResponse = HttpResponse<(ReadResponseBody<SuccessData> | BasicResponseBody)>;

export function* handleAuthenticate(command: Authenticate): Generator<unknown, (null | AuthenticateResponse)> {
    const request: HttpRequest = createPostRequest({
        url: apiV1BaseUrl + '/auth/authenticate',
        body: {
            username: command.payload.username,
            password: command.payload.password,
        },
        isLoaderEnabled: command.payload.isLoaderEnabled,
    });
    yield put(createSendHttpRequest(request));
    //@ts-ignore
    return yield call(findHttpResponse, request);
}

export function createAuthenticate(settings: AuthenticateSettings): Authenticate {
    return {
        type: ApiV1CommandTypes.AUTHENTICATE,
        payload: settings,
    };
}

export type Authenticate = Command<ApiV1CommandTypes.AUTHENTICATE, AuthenticateSettings>;

export type SuccessData = {
    token: string,
    user: User
};

type AuthenticateSettings = {
    username: string,
    password: string,
    isLoaderEnabled: boolean,
};