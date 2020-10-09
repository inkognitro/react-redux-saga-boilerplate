import { Command } from "packages/common/entity-base/common-types";
import { ApiV1Request } from "./types";

export enum ApiV1CommandTypes {
    SEND_API_V1_REQUEST = "SEND_API_V1_REQUEST-47406dac-1dc9-4831-a20a-ac917a944ddb",
}

export type SendApiV1Request = Command<ApiV1CommandTypes.SEND_API_V1_REQUEST, { request: ApiV1Request }>
export function createSendApiV1Request(request: ApiV1Request): SendApiV1Request {
    return {
        type: ApiV1CommandTypes.SEND_API_V1_REQUEST,
        payload: { request },
    };
}
