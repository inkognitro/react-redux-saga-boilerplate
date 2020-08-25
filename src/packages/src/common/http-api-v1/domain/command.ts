import { Command } from "packages/entity/common-types";
import { Request } from "packages/common/http-foundation/domain";

export enum ApiV1CommandTypes {
    SEND_HTTP_REQUEST = "SEND_HTTP_REQUEST-47406dac-1dc9-4831-a20a-ac917a944ddb",
}

export function createSendHttpRequest(request: Request): SendHttpRequest {
    return {
        type: ApiV1CommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}

export type SendHttpRequest = Command<ApiV1CommandTypes.SEND_HTTP_REQUEST, {
    request: Request;
}>;
