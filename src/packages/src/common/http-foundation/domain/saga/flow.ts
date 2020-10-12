import { spawn, takeEvery, put, cancelled, select, call } from 'redux-saga/effects';
import { HttpFoundationState, HttpFoundationStateSelector, HttpRequestDispatcher, RequestResponse } from '../types';
import { HttpFoundationCommandTypes, SendRequest } from '../command';
import { findRunningHttpRequestById } from '../query';
import {
    createResponseCouldNotBeReceived,
    createRequestWasCancelled,
    createRequestWasNotSent,
    createRequestWasSent,
    createResponseWasReceived,
    Reasons,
} from '../event';

export function createHttpFoundationSaga(
    httpStateSelector: HttpFoundationStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher
): () => Generator {
    return function* (): Generator {
        yield spawn(watchSendRequestCommands, httpStateSelector, httpRequestDispatcher);
    };
}

function* watchSendRequestCommands(
    httpFoundationStateSelector: HttpFoundationStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher
): Generator {
    yield takeEvery(
        HttpFoundationCommandTypes.SEND_REQUEST,
        handleSendHttpRequest,
        httpFoundationStateSelector,
        httpRequestDispatcher
    );
}

function* handleSendHttpRequest(
    httpFoundationStateSelector: HttpFoundationStateSelector,
    httpRequestDispatcher: HttpRequestDispatcher,
    command: SendRequest
): Generator {
    // @ts-ignore
    const httpState: HttpFoundationState = yield select(httpFoundationStateSelector);
    if (findRunningHttpRequestById(httpState, command.payload.request.id)) {
        put(createRequestWasNotSent(command.payload.request, Reasons.REQUEST_WITH_SAME_ID_IS_ALREADY_RUNNING));
        return;
    }
    yield put(createRequestWasSent(command.payload.request));
    try {
        // @ts-ignore
        const requestResponse: RequestResponse = yield call(
            httpRequestDispatcher.executeRequest,
            command.payload.request
        );
        if (!requestResponse.response) {
            yield put(createResponseCouldNotBeReceived(requestResponse.request));
            return;
        }
        yield put(createResponseWasReceived(requestResponse.request, requestResponse.response));
        return;
    } finally {
        if (yield cancelled()) {
            yield put(createRequestWasCancelled(command.payload.request));
        }
    }
}
