import {
    call, cancelled, put, select, takeEvery,
} from "@redux-saga/core/effects";
import {
    createHttpErrorResponseWasReceived,
    createHttpRequestFailed,
    createHttpRequestWasCancelled,
    createHttpRequestWasNotSent,
    createHttpSuccessResponseWasReceived,
    createRequestWasSent,
    Reasons,
} from "../../event";
import {
    HttpFoundationState,
    HttpFoundationStateSelector,
    HttpRequestDispatcher,
    RequestResponse,
} from "../../types";
import { findRunningHttpRequestById } from "../../query";
import { HttpFoundationCommandTypes, SendHttpRequest } from "../../command";

export function createWatchSendHttpRequestCommands(
    httpStateSelector: HttpFoundationStateSelector,
    requestDispatcher: HttpRequestDispatcher,
): () => Generator {
    function* handleSendHttpRequest(command: SendHttpRequest): Generator {
        // @ts-ignore
        const httpState: HttpFoundationState = yield select(httpStateSelector);
        if (findRunningHttpRequestById(httpState, command.payload.request.id)) {
            put(
                createHttpRequestWasNotSent(
                    command.payload.request,
                    Reasons.REQUEST_WITH_SAME_ID_IS_ALREADY_RUNNING,
                ),
            );
            return;
        }
        yield put(createRequestWasSent(command.payload.request));
        try {
            // @ts-ignore
            const requestResponse: RequestResponse = yield call(
                requestDispatcher.executeRequest,
                command.payload.request,
            );
            if (!requestResponse.response) {
                yield put(createHttpRequestFailed(requestResponse.request));
                return;
            }
            if (requestResponse.response.header.statusCode !== 200) {
                yield put(
                    createHttpErrorResponseWasReceived(
                        requestResponse.request,
                        requestResponse.response,
                    ),
                );
                return;
            }
            yield put(
                createHttpSuccessResponseWasReceived(
                    requestResponse.request,
                    requestResponse.response,
                ),
            );
            return;
        } finally {
            if (yield cancelled()) {
                yield put(createHttpRequestWasCancelled(command.payload.request));
            }
        }
    }

    return function* (): Generator {
        yield takeEvery(
            HttpFoundationCommandTypes.SEND_HTTP_REQUEST,
            handleSendHttpRequest,
        );
    };
}
