import { AuthStateSelector } from "Packages/Common/Authentication";
import { spawn, takeEvery } from "@redux-saga/core/effects";
import { ApiV1CommandTypes } from "../../Types";
import { handleSendHttpRequest } from "./SendHttpRequestHandling";

export function createHttpApiV1Saga(authStateSelector: AuthStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchSendHttpRequestCommands, authStateSelector);
    };
}

function* watchSendHttpRequestCommands(authStateSelector: AuthStateSelector): Generator {
    yield takeEvery(ApiV1CommandTypes.SEND_HTTP_REQUEST, handleSendHttpRequest, authStateSelector);
}
