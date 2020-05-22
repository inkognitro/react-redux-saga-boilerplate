import { spawn } from "redux-saga/effects";
import { HttpFoundationStateSelector } from "Packages/Common/HttpFoundation/Domain/Types";
import { createWatchSendHttpRequestFlow } from "Packages/Common/HttpFoundation/Domain/Command/SendHttpRequest";
import { HttpRequestDispatcher } from "Packages/Common/HttpFoundation/Domain/HttpRequestDispatcher";

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
