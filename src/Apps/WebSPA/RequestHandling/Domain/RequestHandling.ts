import { spawn } from "redux-saga/effects";
import { createHttpApiV1ToasterSaga } from "Packages/Common/HttpApiV1Toaster/Domain/Saga/Flow";
import { createHttpFoundationSaga } from "Packages/Common/HttpFoundation/Domain/Saga/Flow";
import { HttpFoundationStateSelector } from "Packages/Common/HttpFoundation/Domain/Types";
import { HttpRequestDispatcher } from "Packages/Common/HttpFoundation/Domain/HttpRequestDispatcher";
import { AuthStateSelector } from "Packages/Common/Authentication/Domain/Types";
import {createHttpApiV1Saga} from "Packages/Common/HttpApiV1/Domain/Saga/Flow";

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
