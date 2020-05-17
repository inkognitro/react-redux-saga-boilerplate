import { spawn } from "redux-saga/effects";
import { createHttpApiV1Saga } from "Common/Domain/HttpApiV1/HttpApiV1";
import { createHttpApiV1ToasterSaga } from "Common/Domain/HttpApiV1Toaster/HttpApiV1Toaster";
import { createHttpFoundationSaga } from "Common/Domain/HttpFoundation/HttpFoundation";
import { HttpFoundationStateSelector } from "Common/Domain/HttpFoundation/Types";
import { HttpRequestDispatcher } from "Common/Domain/HttpFoundation/HttpRequestDispatcher";
import { AuthStateSelector } from "Common/Domain/Authentication/Types";

export function createRequestHandlingSaga(
    httpStateSelector: HttpFoundationStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher,
    authStateSelector: AuthStateSelector,
): () => Generator {
    return function* (): Generator {
        yield spawn(createHttpFoundationSaga(httpStateSelector, httpRequestDispatcher));
        yield spawn(createHttpApiV1Saga(authStateSelector));
        yield spawn(createHttpApiV1ToasterSaga());
    };
}
