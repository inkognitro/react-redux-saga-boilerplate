import {HttpRequest, HttpResponse} from "Common/RequestHandling/Domain/Http/Types";
import {findHttpResponse} from "Common/RequestHandling/Domain/Http/Callables/HttpResponse";
import {call, put} from "@redux-saga/core/effects";
import {createSendHttpRequest} from "Common/RequestHandling/Domain/Http/Command/SendHttpRequest";
import {BasicResponseBody} from "Common/ApiV1WIP/Domain/Http/Types";
import {createApiV1HttpResponseWasReceived} from "Common/ApiV1WIP/Domain/Http/Event/ApiV1HttpResponseWasReceived";
import {createApiV1HttpConnectionFailed} from "Common/ApiV1WIP/Domain/Http/Event/ApiV1HttpConnectionFailed";

type ApiV1HttpResponse = HttpResponse<BasicResponseBody>;

export function* executeApiV1HttpRequest(request: HttpRequest): Generator<unknown, (null | ApiV1HttpResponse)> {
    yield put(createSendHttpRequest(request));
    //@ts-ignore
    const response: (null | ApiV1HttpResponse) = yield call(findHttpResponse, settings.request);
    if(response === null) {
        put(createApiV1HttpConnectionFailed(request));
        return null;
    }
    yield put(createApiV1HttpResponseWasReceived(request, response));
    return response;
}

//todo: write own package or subpackage for toast dispatching!