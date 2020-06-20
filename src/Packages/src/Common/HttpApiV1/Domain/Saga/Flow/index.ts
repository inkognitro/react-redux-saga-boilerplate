import { AuthStateSelector } from "Packages/Common/Authentication/Domain";
import { spawn, takeEvery } from "@redux-saga/core/effects";
import { handleSendHttpRequest } from "./SendHttpRequestHandling";
import { ApiV1CommandTypes } from "../../Command/Types";

export function createHttpApiV1Saga(authStateSelector: AuthStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchSendHttpRequestCommands, authStateSelector);
    };
}

function* watchSendHttpRequestCommands(authStateSelector: AuthStateSelector): Generator {
    yield takeEvery(ApiV1CommandTypes.SEND_HTTP_REQUEST, handleSendHttpRequest, authStateSelector);
}
