import { put, take, StrictEffect } from 'redux-saga/effects';
import { Response } from 'packages/common/http-foundation/domain';
import { ApiV1Request, ApiV1RequestResponse } from '../types';
import { createSendApiV1Request } from '../command';
import {
    createHttpApiV1WasInitialized,
    HttpApiV1EventTypes,
    ResponseCouldNotBeReceived,
    ResponseWasReceived,
} from '../event';

export function* initializeHttpApiV1(baseUrl: string): Generator {
    yield put(createHttpApiV1WasInitialized(baseUrl));
}

const endingExecutionEventTypes = [
    HttpApiV1EventTypes.RESPONSE_COULD_NOT_BE_RECEIVED,
    HttpApiV1EventTypes.RESPONSE_WAS_RECEIVED,
];

type EndingExecutionEvent = ResponseCouldNotBeReceived | ResponseWasReceived;

function createRequestResponse<Req extends ApiV1Request, Res extends Response>(
    request: Req,
    response?: Res
): ApiV1RequestResponse<Req, Res> {
    return { request, response };
}

export function* executeRequest<Req extends ApiV1Request = any, Res extends Response = any>(
    request: Req
): Generator<StrictEffect, ApiV1RequestResponse> {
    yield put(createSendApiV1Request(request));
    let requestId = null;
    let event = null;
    while (requestId !== request.id) {
        event = yield take(endingExecutionEventTypes);
        // @ts-ignore
        requestId = event.payload.request.id;
    }
    // @ts-ignore
    const endingEvent: EndingExecutionEvent = event;
    if (endingEvent.type === HttpApiV1EventTypes.RESPONSE_WAS_RECEIVED) {
        const { response } = endingEvent.payload;
        // @ts-ignore
        return createRequestResponse<Req, Res>(request, response);
    }
    return createRequestResponse(request);
}
