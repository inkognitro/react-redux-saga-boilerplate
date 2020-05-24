import { call, put, CallEffect } from "redux-saga/effects";
import { createSendHttpRequest } from "Packages/Common/HttpFoundation";
import { ReceiveHttpResponseGenerator, receiveResponse } from "./ResponseReceiving";
import { Request, Response } from "../../Types";

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
