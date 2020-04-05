import {apiV1BaseUrl, ApiV1CommandTypes} from "Common/ApiV1WIP/Domain/Http/ApiV1Http";
import {BasicResponseBody, ReadResponseBody} from "Common/ApiV1WIP/Domain/Http/Types";
import {User} from "Common/Model/Domain/User";
import {Command} from "Common/Bootstrap/Domain/Command";
import {call} from "@redux-saga/core/effects";
import {executeApiV1HttpRequest} from "Common/ApiV1WIP/Domain/Http/Callables/RequestExecution";
import {createPostRequest} from "Common/RequestHandling/Domain/Http/Command/RequestFactory";
import {HttpRequest, HttpResponse} from "Common/RequestHandling/Domain/Http/Types";

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
    //@ts-ignore
    return yield call(executeApiV1HttpRequest, request);
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