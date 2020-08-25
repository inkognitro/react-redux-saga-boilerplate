import { receiveResponse, Request } from "packages/common/HttpFoundation/Domain";
import {
    call, CallEffect, put, StrictEffect,
} from "@redux-saga/core/effects";
import { createSendHttpRequest } from "../../Command/SendHttpRequest";
import { ApiV1Response } from "../../Types";

type ExecuteRequestGenerator<ResponseBody> = Generator<StrictEffect, (null | ApiV1Response<ResponseBody>)>;

function* internalExecuteRequest<ResponseBody>(request: Request): ExecuteRequestGenerator<ResponseBody> {
    yield put(createSendHttpRequest(request));
    // @ts-ignore
    return yield receiveResponse<ApiV1Response<ResponseBody>>(request);
}

type ExecuteRequestCallEffect<ResponseBody> = CallEffect<{
    context: any
    fn: ExecuteRequestGenerator<ResponseBody>
    args: any[]
}>

export function executeRequest<ResponseBody>(request: Request): ExecuteRequestCallEffect<ResponseBody> {
    // @ts-ignore
    return call(internalExecuteRequest, request);
}

export const apiV1BaseUrl = "//localhost:9000";
