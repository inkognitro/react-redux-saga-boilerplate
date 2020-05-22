import { HttpRequestDispatcher } from "Packages/Common/HttpFoundation/Domain/HttpRequestDispatcher";
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
} from "Packages/Common/HttpFoundation/Domain/Types";
import { createRequestWasSent } from "Packages/Common/HttpFoundation/Domain/Event/HttpRequestWasSent";
import {
    createHttpSuccessResponseWasReceived,
} from "Packages/Common/HttpFoundation/Domain/Event/HttpSuccessResponseWasReceived";
import { createHttpErrorResponseWasReceived } from "Packages/Common/HttpFoundation/Domain/Event/HttpErrorResponseWasReceived";
import { findRunningHttpRequestById } from "Packages/Common/HttpFoundation/Domain/Query/HttpRequestQuery";
import {
    createHttpRequestWasNotSent,
    Reasons,
} from "Packages/Common/HttpFoundation/Domain/Event/HttpRequestWasNotSent";
import { createHttpRequestFailed } from "Packages/Common/HttpFoundation/Domain/Event/HttpRequestFailed";
import { createHttpRequestWasCancelled } from "Packages/Common/HttpFoundation/Domain/Event/HttpRequestWasCancelled";
import {Command} from "Packages/Common/Types";

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
