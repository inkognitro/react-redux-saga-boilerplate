import { HttpFoundationCommandTypes, Request } from "Packages/Common/HttpFoundation/Domain/Types";
import { Command } from "Packages/Common/CommonTypes";

export function createSendHttpRequest(request: Request): SendHttpRequest {
    return {
        type: HttpFoundationCommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}

export type SendHttpRequest = Command<HttpFoundationCommandTypes.SEND_HTTP_REQUEST, {
    request: Request;
}>;
