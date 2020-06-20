import {
    call, cancelled, put, select, takeEvery,
} from "@redux-saga/core/effects";
import {
    HttpFoundationState,
    HttpFoundationStateSelector,
    HttpRequestDispatcher,
    RequestResponse,
} from "../../Types";
import { HttpFoundationCommandTypes } from "../../Command/Types";
import { SendHttpRequest } from "../../Command/SendHttpRequest";
import { findRunningHttpRequestById } from "../../Query/HttpRequestQuery";
import { createHttpRequestWasNotSent, Reasons } from "../../Event/HttpRequestWasNotSent";
import { createRequestWasSent } from "../../Event/HttpRequestWasSent";
import { createHttpRequestFailed } from "../../Event/HttpRequestFailed";
import { createHttpErrorResponseWasReceived } from "../../Event/HttpErrorResponseWasReceived";
import { createHttpSuccessResponseWasReceived } from "../../Event/HttpSuccessResponseWasReceived";
import { createHttpRequestWasCancelled } from "../../Event/HttpRequestWasCancelled";

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
