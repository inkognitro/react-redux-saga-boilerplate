import { Command } from "packages/common/types/util/domain";
import { Request } from "./types";

export enum HttpFoundationCommandTypes {
    SEND_REQUEST = "SEND_REQUEST-639d43a1-e8dd-426d-a868-5079aa60d064",
}

export type SendRequest = Command<HttpFoundationCommandTypes.SEND_REQUEST, { request: Request }>
export function createSendRequest(request: Request): SendRequest {
    return {
        type: HttpFoundationCommandTypes.SEND_REQUEST,
        payload: { request },
    };
}
