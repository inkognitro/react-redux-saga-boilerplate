import { ApiV1CommandTypes } from "Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http";
import { Command } from "Common/Domain/Bus/Command";
import { HttpRequest } from "Common/Domain/RequestHandling/Base/Http/Types";

export function createSendHttpRequest(request: HttpRequest): SendHttpRequest {
  return {
    type: ApiV1CommandTypes.SEND_HTTP_REQUEST,
    payload: { request },
  };
}

export type SendHttpRequest = Command<
  ApiV1CommandTypes.SEND_HTTP_REQUEST,
  {
    request: HttpRequest;
  }
>;
