import {
    HttpFoundationCommandTypes,
    HttpFoundationState,
    HttpFoundationStateSelector,
    RequestResponse,
    SendHttpRequest,
} from "Packages/Common/HttpFoundation";
import { HttpRequestDispatcher } from "Packages/Common/HttpFoundation/Domain/HttpRequestDispatcher";
import {
    call, cancelled, put, select, takeEvery,
} from "@redux-saga/core/effects";
import { findRunningHttpRequestById } from "Packages/Common/HttpFoundation/Domain/Query/HttpRequestQuery";
import { createHttpRequestWasNotSent, Reasons } from "Packages/Common/HttpFoundation/Domain/Event/HttpRequestWasNotSent";
import { createRequestWasSent } from "Packages/Common/HttpFoundation/Domain/Event/HttpRequestWasSent";
import { createHttpRequestFailed } from "Packages/Common/HttpFoundation/Domain/Event/HttpRequestFailed";
import { createHttpErrorResponseWasReceived } from "Packages/Common/HttpFoundation/Domain/Event/HttpErrorResponseWasReceived";
import { createHttpSuccessResponseWasReceived } from "Packages/Common/HttpFoundation/Domain/Event/HttpSuccessResponseWasReceived";
import { createHttpRequestWasCancelled } from "Packages/Common/HttpFoundation/Domain/Event/HttpRequestWasCancelled";

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
            if (requestResponse.response.statusCode !== 200) {
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
