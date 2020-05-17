import { spawn, takeEvery } from "redux-saga/effects";
import { AuthStateSelector } from "Packages/Common/Domain/Authentication/Types";
import { handleSendHttpRequest } from "Packages/Common/Domain/HttpApiV1/Saga/SendHttpRequestHandling";
import { ApiV1CommandTypes } from "Packages/Common/Domain/HttpApiV1/Types";

export function createHttpApiV1Saga(authStateSelector: AuthStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchSendHttpRequestCommands, authStateSelector);
    };
}

function* watchSendHttpRequestCommands(authStateSelector: AuthStateSelector): Generator {
    yield takeEvery(ApiV1CommandTypes.SEND_HTTP_REQUEST, handleSendHttpRequest, authStateSelector);
}

export const apiV1BaseUrl = "//localhost:9000";
export { authenticate, AuthenticateResult } from "Packages/Common/Domain/HttpApiV1/Saga/Callables/Authenticate";
