import { call, put, CallEffect } from "redux-saga/effects";
import { ReceiveHttpResponseGenerator, receiveResponse } from "./receive.response";
import { Request, Response } from "../../types";
import { createSendHttpRequest } from "../../command";

export type ExecuteRequestCallEffect<SpecificResponse> = CallEffect<{
    context: any
    fn: ReceiveHttpResponseGenerator<SpecificResponse>
    args: any[]
}>

function* internalExecuteRequest<SpecificResponse = Response>(request: Request): ReceiveHttpResponseGenerator<SpecificResponse> {
    yield put(createSendHttpRequest(request));
    // @ts-ignore
    return yield receiveResponse(request);
}

export function executeRequest<SpecificResponse = Response>(request: Request): ExecuteRequestCallEffect<SpecificResponse> {
    // @ts-ignore
    return call(internalExecuteRequest, request);
}
