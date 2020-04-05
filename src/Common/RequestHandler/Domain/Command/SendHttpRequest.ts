import {HttpRequestHandlerCommandTypes} from "Common/RequestHandler/Domain/RequestHandler";
import {Command} from "Common/Bootstrap/Domain/Command";
import {HttpRequestDispatcher} from "Common/RequestHandler/Domain/HttpRequestDispatcher";
import {call, cancelled, put, select, takeEvery} from "@redux-saga/core/effects";
import {
    HttpRequest,
    HttpRequestResponse,
    RequestHandlerState,
    RequestHandlerStateSelector,
} from "Common/RequestHandler/Domain/Types";
import {createRequestWasSent} from "Common/RequestHandler/Domain/Event/HttpRequestWasSent";
import {createHttpSuccessResponseWasReceived} from "Common/RequestHandler/Domain/Event/HttpSuccessResponseWasReceived";
import {createHttpErrorResponseWasReceived} from "Common/RequestHandler/Domain/Event/HttpErrorResponseWasReceived";
import {findRunningHttpRequestById} from "Common/RequestHandler/Domain/Query/HttpRequestQuery";
import {createHttpRequestWasNotSent, Reasons} from "Common/RequestHandler/Domain/Event/HttpRequestWasNotSent";
import {createHttpRequestFailed} from "Common/RequestHandler/Domain/Event/HttpRequestFailed";
import {createHttpRequestWasCancelled} from "Common/RequestHandler/Domain/Event/HttpRequestWasCancelled";

export function createWatchSendHttpRequestSaga(
    requestHandlerStateSelector: RequestHandlerStateSelector,
    requestDispatcher: HttpRequestDispatcher
): GeneratorFunction {
    const handleSendHttpRequest = function* (command: SendHttpRequest): Generator {
        //@ts-ignore
        const requestHandlerState: RequestHandlerState = yield select(requestHandlerStateSelector);
        if(findRunningHttpRequestById(requestHandlerState, command.payload.request.id)) {
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