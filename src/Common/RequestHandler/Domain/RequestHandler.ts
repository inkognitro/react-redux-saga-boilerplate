import {spawn} from "@redux-saga/core/effects";
import {RequestHandlerStateSelector} from "Common/RequestHandler/Domain/Types";
import {createWatchSendHttpRequestSaga} from "Common/RequestHandler/Domain/Command/SendHttpRequest";
import {HttpRequestDispatcher} from "Common/RequestHandler/Domain/HttpRequestDispatcher";

export enum HttpRequestHandlerCommandTypes {
    SEND_HTTP_REQUEST = 'SEND_HTTP_REQUEST-639d43a1-e8dd-426d-a868-5079aa60d064',
}

export function createRequestHandlerSaga(
    requestHandlerStateSelector: RequestHandlerStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher
): () => Generator {
    return function* requestHandlerSaga() {
        yield spawn(createWatchSendHttpRequestSaga(requestHandlerStateSelector, httpRequestDispatcher));
    }
}