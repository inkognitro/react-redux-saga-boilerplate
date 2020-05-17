import { Command } from "Packages/Common/Domain/Bus/Command";
import { Request } from "Packages/Common/Domain/HttpFoundation/Types";
import {ApiV1CommandTypes} from "Packages/Common/Domain/HttpApiV1/Types";

export function createSendHttpRequest(request: Request): SendHttpRequest {
    return {
        type: ApiV1CommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}

export type SendHttpRequest = Command<ApiV1CommandTypes.SEND_HTTP_REQUEST, {
    request: Request;
}>;
