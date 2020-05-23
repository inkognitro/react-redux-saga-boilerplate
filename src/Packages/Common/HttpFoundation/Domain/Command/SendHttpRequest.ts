import { Command } from "Packages/Common/CommonTypes";
import { HttpFoundationCommandTypes, Request } from "../Types";

export function createSendHttpRequest(request: Request): SendHttpRequest {
    return {
        type: HttpFoundationCommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}

export type SendHttpRequest = Command<HttpFoundationCommandTypes.SEND_HTTP_REQUEST, {
    request: Request;
}>;
