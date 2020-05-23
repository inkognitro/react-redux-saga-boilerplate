import { Request } from "Packages/Common/HttpFoundation/Domain/Types";
import {ApiV1CommandTypes} from "Packages/Common/HttpApiV1/Domain/Types";
import {Command} from "Packages/Common/CommonTypes";

export function createSendHttpRequest(request: Request): SendHttpRequest {
    return {
        type: ApiV1CommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}

export type SendHttpRequest = Command<ApiV1CommandTypes.SEND_HTTP_REQUEST, {
    request: Request;
}>;
