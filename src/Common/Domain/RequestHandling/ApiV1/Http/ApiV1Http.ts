import { spawn, takeEvery } from "redux-saga/effects";
import { AuthStateSelector } from "Common/Domain/Authentication/Types";
import { handleSendHttpRequest } from "Common/Domain/RequestHandling/ApiV1/Http/Saga/SendHttpRequestHandling";

export enum ApiV1CommandTypes {
  SEND_HTTP_REQUEST = "SEND_HTTP_REQUEST-47406dac-1dc9-4831-a20a-ac917a944ddb",
}

export const apiV1BaseUrl = "//localhost:9000";

export function createApiV1HttpSaga(authStateSelector: AuthStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchSendHttpRequestCommands, authStateSelector);
    };
}

function* watchSendHttpRequestCommands(authStateSelector: AuthStateSelector): Generator {
    yield takeEvery(ApiV1CommandTypes.SEND_HTTP_REQUEST, handleSendHttpRequest, authStateSelector);
}
