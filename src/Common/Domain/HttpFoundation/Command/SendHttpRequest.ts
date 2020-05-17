import { Command } from "Common/Domain/Bus/Command";
import { HttpRequestDispatcher } from "Common/Domain/HttpFoundation/HttpRequestDispatcher";
import {
    call,
    cancelled,
    put,
    select,
    takeEvery,
} from "redux-saga/effects";
import {
    Request,
    HttpFoundationCommandTypes,
    RequestResponse,
    HttpFoundationState,
    HttpFoundationStateSelector,
} from "Common/Domain/HttpFoundation/Types";
import { createRequestWasSent } from "Common/Domain/HttpFoundation/Event/HttpRequestWasSent";
import {
    createHttpSuccessResponseWasReceived,
} from "Common/Domain/HttpFoundation/Event/HttpSuccessResponseWasReceived";
import { createHttpErrorResponseWasReceived } from "Common/Domain/HttpFoundation/Event/HttpErrorResponseWasReceived";
import { findRunningHttpRequestById } from "Common/Domain/HttpFoundation/Query/HttpRequestQuery";
import {
    createHttpRequestWasNotSent,
    Reasons,
} from "Common/Domain/HttpFoundation/Event/HttpRequestWasNotSent";
import { createHttpRequestFailed } from "Common/Domain/HttpFoundation/Event/HttpRequestFailed";
import { createHttpRequestWasCancelled } from "Common/Domain/HttpFoundation/Event/HttpRequestWasCancelled";

export function createWatchSendHttpRequestFlow(
    httpStateSelector: HttpFoundationStateSelector,
    requestDispatcher: HttpRequestDispatcher,
): () => Generator {
    const handleSendHttpRequest = function* (
        command: SendHttpRequest,
    ): Generator {
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
    };

    return function* (): Generator {
        yield takeEvery(
            HttpFoundationCommandTypes.SEND_HTTP_REQUEST,
            handleSendHttpRequest,
        );
    };
}

export function createSendHttpRequest(request: Request): SendHttpRequest {
    return {
        type: HttpFoundationCommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}

export type SendHttpRequest = Command<
  HttpFoundationCommandTypes.SEND_HTTP_REQUEST,
  {
    request: Request;
  }
>;
