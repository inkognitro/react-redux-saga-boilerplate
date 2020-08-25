import { Request } from "packages/common/HttpFoundation/Domain";
import { Command } from "packages/entity/common-types";
import { ApiV1CommandTypes } from "./Types";

export function createSendHttpRequest(request: Request): SendHttpRequest {
    return {
        type: ApiV1CommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}

export type SendHttpRequest = Command<ApiV1CommandTypes.SEND_HTTP_REQUEST, {
    request: Request;
}>;
