import { spawn } from "redux-saga/effects";
import { HttpFoundationStateSelector } from "Common/Domain/HttpFoundation/Types";
import { createWatchSendHttpRequestFlow } from "Common/Domain/HttpFoundation/Command/SendHttpRequest";
import { HttpRequestDispatcher } from "Common/Domain/HttpFoundation/HttpRequestDispatcher";

export function createHttpFoundationSaga(
    httpStateSelector: HttpFoundationStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher,
): () => Generator {
    return function* (): Generator {
        yield spawn(
            createWatchSendHttpRequestFlow(httpStateSelector, httpRequestDispatcher),
        );
    };
}
