import { spawn } from "redux-saga/effects";
import { TranslatorStateSelector } from "Common/Domain/Translator/Types";
import { createApiV1HttpFlow } from "Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http";
import { createApiV1HttpToastsFlow } from "Common/Domain/RequestHandling/ApiV1/HttpToasts/ApiV1Toasts";
import { createHttpFlow } from "Common/Domain/RequestHandling/Base/Http/Http";
import { HttpStateSelector } from "Common/Domain/RequestHandling/Base/Http/Types";
import { HttpRequestDispatcher } from "Common/Domain/RequestHandling/Base/Http/HttpRequestDispatcher";
import { AuthStateSelector } from "Common/Domain/Authentication/Types";

export function createRequestHandlingFlow(
    httpStateSelector: HttpStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher,
    authStateSelector: AuthStateSelector,
    translatorStateSelector: TranslatorStateSelector,
): () => Generator {
    return function* (): Generator {
        yield spawn(createHttpFlow(httpStateSelector, httpRequestDispatcher));
        yield spawn(createApiV1HttpFlow(authStateSelector));
        yield spawn(createApiV1HttpToastsFlow(translatorStateSelector));
    };
}
