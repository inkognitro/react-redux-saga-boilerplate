import { spawn, takeEvery } from "redux-saga/effects";
import { AuthStateSelector } from "Packages/Common/Domain/Authentication/Types";
import { handleSendHttpRequest } from "Packages/Common/Domain/HttpApiV1/Saga/SendHttpRequestHandling";

export enum ApiV1CommandTypes {
  SEND_HTTP_REQUEST = "SEND_HTTP_REQUEST-47406dac-1dc9-4831-a20a-ac917a944ddb",
}

export const apiV1BaseUrl = "//localhost:9000";

export function createHttpApiV1Saga(authStateSelector: AuthStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchSendHttpRequestCommands, authStateSelector);
    };
}

function* watchSendHttpRequestCommands(authStateSelector: AuthStateSelector): Generator {
    yield takeEvery(ApiV1CommandTypes.SEND_HTTP_REQUEST, handleSendHttpRequest, authStateSelector);
}
