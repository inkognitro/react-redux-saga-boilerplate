import {spawn} from "@redux-saga/core/effects";
import {createSendHttpRequestSaga} from "Common/RequestHandling/Domain/ApiV1/Http/Command/SendHttpRequest";
import {AuthStateSelector} from "Common/AuthenticationWIP/Domain/Types";

export enum ApiV1CommandTypes {
    SEND_HTTP_REQUEST = 'SEND_HTTP_REQUEST-47406dac-1dc9-4831-a20a-ac917a944ddb',
}

export const apiV1BaseUrl = '//localhost:9000';

export function createApiV1HttpSaga(authStateSelector: AuthStateSelector): () => Generator {
    return function* watchApiV1Events(): Generator {
        yield spawn(createSendHttpRequestSaga(authStateSelector));
    }
}