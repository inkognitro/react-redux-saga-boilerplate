import { Command } from "packages/entity/common-types";
import { Request } from "./types";

export enum HttpFoundationCommandTypes {
    SEND_HTTP_REQUEST = "SEND_HTTP_REQUEST-639d43a1-e8dd-426d-a868-5079aa60d064",
}

export function createSendHttpRequest(request: Request): SendHttpRequest {
    return {
        type: HttpFoundationCommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}

export type SendHttpRequest = Command<HttpFoundationCommandTypes.SEND_HTTP_REQUEST, {
    request: Request;
}>;
