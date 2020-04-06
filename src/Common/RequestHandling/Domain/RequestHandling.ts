import {spawn} from "@redux-saga/core/effects";
import {TranslatorStateSelector} from "Common/Translator/Domain/Types";
import {createApiV1HttpSaga} from "Common/RequestHandling/Domain/ApiV1/Http/ApiV1Http";
import {createApiV1HttpToastsSaga} from "Common/RequestHandling/Domain/ApiV1/HttpToasts/ApiV1Toasts";
import {createHttpSaga} from "Common/RequestHandling/Domain/Base/Http/Http";
import {HttpStateSelector} from "Common/RequestHandling/Domain/Base/Http/Types";
import {HttpRequestDispatcher} from "Common/RequestHandling/Domain/Base/Http/HttpRequestDispatcher";
import {AuthStateSelector} from "Common/AuthenticationWIP/Domain/Types";

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