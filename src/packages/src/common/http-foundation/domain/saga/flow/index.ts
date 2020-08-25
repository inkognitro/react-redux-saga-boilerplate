import { spawn } from "redux-saga/effects";
import { HttpFoundationStateSelector, HttpRequestDispatcher } from "../../types";
import { createWatchSendHttpRequestCommands } from "./send.request.handling";

export function createHttpFoundationSaga(
    httpStateSelector: HttpFoundationStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher,
): () => Generator {
    return function* (): Generator {
        yield spawn(createWatchSendHttpRequestCommands(httpStateSelector, httpRequestDispatcher));
    };
}
