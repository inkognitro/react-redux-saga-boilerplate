import {spawn} from "@redux-saga/core/effects";
import {HttpStateSelector} from "Common/RequestHandling/Domain/Base/Http/Types";
import {createWatchSendHttpRequestSaga} from "Common/RequestHandling/Domain/Base/Http/Command/SendHttpRequest";
import {HttpRequestDispatcher} from "Common/RequestHandling/Domain/Base/Http/HttpRequestDispatcher";

export enum HttpRequestHandlerCommandTypes {
    SEND_HTTP_REQUEST = 'SEND_HTTP_REQUEST-639d43a1-e8dd-426d-a868-5079aa60d064',
}

export function createHttpSaga(
    httpStateSelector: HttpStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher
): () => Generator {
    return function* requestHandlerSaga() {
        yield spawn(createWatchSendHttpRequestSaga(httpStateSelector, httpRequestDispatcher));
    }
}