import { spawn } from "redux-saga/effects";
import { createHttpApiV1Saga } from "Packages/Common/Domain/HttpApiV1/HttpApiV1";
import { createHttpApiV1ToasterSaga } from "Packages/Common/Domain/HttpApiV1Toaster/HttpApiV1Toaster";
import { createHttpFoundationSaga } from "Packages/Common/Domain/HttpFoundation/HttpFoundation";
import { HttpFoundationStateSelector } from "Packages/Common/Domain/HttpFoundation/Types";
import { HttpRequestDispatcher } from "Packages/Common/Domain/HttpFoundation/HttpRequestDispatcher";
import { AuthStateSelector } from "Packages/Common/Domain/Authentication/Types";

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
