import { spawn } from "redux-saga/effects";
import { HttpFoundationStateSelector } from "Packages/Common/HttpFoundation/Domain/Types";
import { HttpRequestDispatcher } from "Packages/Common/HttpFoundation/Domain/HttpRequestDispatcher";
import { createWatchSendHttpRequestCommands } from "Packages/Common/HttpFoundation/Domain/Saga/Flow/SendHttpRequestHandling";

export function createHttpFoundationSaga(
    httpStateSelector: HttpFoundationStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher,
): () => Generator {
    return function* (): Generator {
        yield spawn(createWatchSendHttpRequestCommands(httpStateSelector, httpRequestDispatcher));
    };
}
