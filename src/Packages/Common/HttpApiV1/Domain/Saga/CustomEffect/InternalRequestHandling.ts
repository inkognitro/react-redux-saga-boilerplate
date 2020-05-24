import { Request, receiveResponse } from "Packages/Common/HttpFoundation";
import { call, put, CallEffect, StrictEffect } from "@redux-saga/core/effects";
import { ApiV1Response, createSendHttpRequest } from "Packages/Common/HttpApiV1";

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
