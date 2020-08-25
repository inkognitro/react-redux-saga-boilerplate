import { AuthStateSelector } from "packages/common/authentication/domain";
import { spawn, takeEvery } from "@redux-saga/core/effects";
import { handleSendHttpRequest } from "./send.http.request.handling";
import { ApiV1CommandTypes } from "../../command";

export function createHttpApiV1Saga(authStateSelector: AuthStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchSendHttpRequestCommands, authStateSelector);
    };
}

function* watchSendHttpRequestCommands(authStateSelector: AuthStateSelector): Generator {
    yield takeEvery(ApiV1CommandTypes.SEND_HTTP_REQUEST, handleSendHttpRequest, authStateSelector);
}
