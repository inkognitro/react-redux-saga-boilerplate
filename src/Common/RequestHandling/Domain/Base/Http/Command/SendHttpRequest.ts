import {HttpRequestHandlerCommandTypes} from "Common/RequestHandling/Domain/Base/Http/Http";
import {Command} from "Common/Bootstrap/Domain/Command";
import {HttpRequestDispatcher} from "Common/RequestHandling/Domain/Base/Http/HttpRequestDispatcher";
import {call, cancelled, put, select, takeEvery} from "@redux-saga/core/effects";
import {
    HttpRequest,
    HttpRequestResponse,
    HttpState,
    HttpStateSelector,
} from "Common/RequestHandling/Domain/Base/Http/Types";
import {createRequestWasSent} from "Common/RequestHandling/Domain/Base/Http/Event/HttpRequestWasSent";
import {createHttpSuccessResponseWasReceived} from "Common/RequestHandling/Domain/Base/Http/Event/HttpSuccessResponseWasReceived";
import {createHttpErrorResponseWasReceived} from "Common/RequestHandling/Domain/Base/Http/Event/HttpErrorResponseWasReceived";
import {findRunningHttpRequestById} from "Common/RequestHandling/Domain/Base/Http/Query/HttpRequestQuery";
import {createHttpRequestWasNotSent, Reasons} from "Common/RequestHandling/Domain/Base/Http/Event/HttpRequestWasNotSent";
import {createHttpRequestFailed} from "Common/RequestHandling/Domain/Base/Http/Event/HttpRequestFailed";
import {createHttpRequestWasCancelled} from "Common/RequestHandling/Domain/Base/Http/Event/HttpRequestWasCancelled";

export function createWatchSendHttpRequestSaga(
    httpStateSelector: HttpStateSelector,
    requestDispatcher: HttpRequestDispatcher
): GeneratorFunction {
    const handleSendHttpRequest = function* (command: SendHttpRequest): Generator {
        //@ts-ignore
        const httpState: HttpState = yield select(httpStateSelector);
        if(findRunningHttpRequestById(httpState, command.payload.request.id)) {
            put(createHttpRequestWasNotSent(command.payload.request, Reasons.REQUEST_WITH_SAME_ID_IS_ALREADY_RUNNING));
            return;
        }
        yield put(createRequestWasSent(command.payload.request));
        try {
            //@ts-ignore
            const requestResponse: HttpRequestResponse = yield call(requestDispatcher.executeRequest, command.payload);
            if (!requestResponse.response) {
                yield put(createHttpRequestFailed(requestResponse.request));
                return;
            }
            if (requestResponse.response.statusCode !== 200) {
                yield put(createHttpErrorResponseWasReceived(requestResponse.request, requestResponse.response));
                return;
            }
            yield put(createHttpSuccessResponseWasReceived(requestResponse.request, requestResponse.response));
            return;
        } finally {
            if (yield cancelled()) {
                yield put(createHttpRequestWasCancelled(command.payload.request));
            }
        }
    };

    return <GeneratorFunction>function* watchSendHttpRequestSaga(): Generator {
        yield takeEvery(HttpRequestHandlerCommandTypes.SEND_HTTP_REQUEST, handleSendHttpRequest);
    }
}

export function createSendHttpRequest(request: HttpRequest): SendHttpRequest {
    return {
        type: HttpRequestHandlerCommandTypes.SEND_HTTP_REQUEST,
        payload: {request},
    };
}

export type SendHttpRequest = Command<HttpRequestHandlerCommandTypes.SEND_HTTP_REQUEST, {
    request: HttpRequest
}>;