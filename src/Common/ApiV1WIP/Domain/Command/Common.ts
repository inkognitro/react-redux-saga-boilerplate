import {HttpRequest, HttpResponse} from "Common/RequestHandler/Domain/Types";
import {findHttpResponse} from "Common/RequestHandler/Domain/Callables/HttpResponse";
import {call, put} from "@redux-saga/core/effects";
import {createSendHttpRequest} from "Common/RequestHandler/Domain/Command/SendHttpRequest";
import {ApiV1HttpResponse, BasicResponseBody} from "Common/ApiV1WIP/Domain/Types";
import {createApiV1HttpSuccessResponseWasReceived} from "Common/ApiV1WIP/Domain/Event/ApiV1HttpSuccessResponseWasReceived";

type ExecutionSettings = {
    request: HttpRequest,
};

export function* executeApiV1Request(settings: ExecutionSettings): Generator<unknown, (null | HttpResponse<BasicResponseBody>)> {
    yield put(createSendHttpRequest(settings.request));
    //@ts-ignore
    const response: (null | ApiV1HttpResponse) = yield call(findHttpResponse, settings.request);

    if(response === null) {
        //todo: put - connection to server failed event!
        return null;
    }

    //todo: check error vs success response!
    yield put(createApiV1HttpSuccessResponseWasReceived(settings.request, response));

    return response;
}

//todo: write own package or subpackage for toast dispatching!