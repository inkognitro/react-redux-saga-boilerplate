import {apiV1BaseUrl} from "Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http";
import {ReadResponseBody} from "Common/Domain/RequestHandling/ApiV1/Http/Types";
import {User} from "Common/Domain/Model/User";
import {call, put} from "@redux-saga/core/effects";
import {createPostRequest} from "Common/Domain/RequestHandling/Base/Http/Command/RequestFactory";
import {HttpRequest, HttpResponse} from "Common/Domain/RequestHandling/Base/Http/Types";
import {createSendHttpRequest} from "Common/Domain/RequestHandling/ApiV1/Http/Command/SendHttpRequest";
import {findHttpResponse} from "Common/Domain/RequestHandling/Base/Http/Callables/HttpResponse";

type AuthenticateResponse = HttpResponse<ReadResponseBody<{
    token: string,
    user: User
}>>;

export enum ResponseDataTypes {
    SUCCESS = 'success',
    ERROR = 'error',
}

export function* authenticate(settings: AuthenticateSettings): Generator<unknown, (null | ResponseData)> {
    const request: HttpRequest = createPostRequest({
        url: apiV1BaseUrl + '/auth/authenticate',
        body: {
            username: settings.username,
            password: settings.password,
        },
        isLoaderEnabled: settings.isLoaderEnabled,
    });
    yield put(createSendHttpRequest(request));
    //@ts-ignore
    const response: AuthenticateResponse = yield call(findHttpResponse, request);
    if(!response) {
        return null;
    }
    if(response.statusCode === 200) {
        return {
            type: ResponseDataTypes.SUCCESS,
            token: response.body.data.token,
            user: response.body.data.user,
        };
    }
    //@ts-ignore
    return {
        type: ResponseDataTypes.ERROR,
    };
}

export type ResponseData = (ErrorData | SuccessData);

type SuccessData = {
    type: ResponseDataTypes.SUCCESS,
    token: string,
    user: User,
};

type ErrorData = {
    type: ResponseDataTypes.ERROR,
};

type AuthenticateSettings = {
    username: string,
    password: string,
    isLoaderEnabled: boolean,
};