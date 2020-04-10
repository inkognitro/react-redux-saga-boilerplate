import {spawn} from "@redux-saga/core/effects";
import {TranslatorStateSelector} from "Common/Domain/Translator/Types";
import {createApiV1HttpSaga} from "Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http";
import {createApiV1HttpToastsSaga} from "Common/Domain/RequestHandling/ApiV1/HttpToasts/ApiV1Toasts";
import {createHttpSaga} from "Common/Domain/RequestHandling/Base/Http/Http";
import {HttpStateSelector} from "Common/Domain/RequestHandling/Base/Http/Types";
import {HttpRequestDispatcher} from "Common/Domain/RequestHandling/Base/Http/HttpRequestDispatcher";
import {AuthStateSelector} from "Common/Domain/Authentication/Types";

export function createRequestHandlingSaga(
    httpStateSelector: HttpStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher,
    authStateSelector: AuthStateSelector,
    translatorStateSelector: TranslatorStateSelector
): () => Generator {
    return function* (): Generator {
        yield spawn(createHttpSaga(httpStateSelector, httpRequestDispatcher));
        yield spawn(createApiV1HttpSaga(authStateSelector));
        yield spawn(createApiV1HttpToastsSaga(translatorStateSelector));
    };
}