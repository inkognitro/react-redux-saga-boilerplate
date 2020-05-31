import { spawn } from "redux-saga/effects";
import { HttpFoundationStateSelector, HttpRequestDispatcher } from "../../Types";
import { createWatchSendHttpRequestCommands } from "./SendHttpRequestHandling";

export function createHttpFoundationSaga(
    httpStateSelector: HttpFoundationStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher,
): () => Generator {
    return function* (): Generator {
        yield spawn(createWatchSendHttpRequestCommands(httpStateSelector, httpRequestDispatcher));
    };
}
