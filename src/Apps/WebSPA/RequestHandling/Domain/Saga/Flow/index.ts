import {
    createHttpFoundationSaga,
    HttpFoundationStateSelector,
    HttpRequestDispatcher
} from "Packages/Common/HttpFoundation";
import {AuthStateSelector} from "Packages/Common/Authentication/Domain/Types";
import {spawn} from "@redux-saga/core/effects";
import {createHttpApiV1Saga} from "Packages/Common/HttpApiV1";
import {createHttpApiV1ToasterSaga} from "Packages/Common/HttpApiV1Toaster";

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