import { Response } from "Packages/Common/HttpFoundation";
import { FieldMessage, Message } from "Packages/Entity/CommonTypes";

export type BasicResponseBody = {
  generalMessages?: Message[];
  fieldMessages?: FieldMessage[];
};

export type ApiV1Response<Body = {}> = Response<(BasicResponseBody & Body)>
export type ApiV1ReadResponse<Data = {}> = ApiV1Response<{data: Data}>

export enum HttpApiV1EventTypes {
  API_V1_HTTP_RESPONSE_WAS_RECEIVED = "API_V1_HTTP_RESPONSE_WAS_RECEIVED-47406dac-1dc9-4831-a20a-ac917a944ddb",
  API_V1_HTTP_CONNECTION_FAILED = "API_V1_HTTP_CONNECTION_FAILED-47406dac-1dc9-4831-a20a-ac917a944ddb",
}

export enum ApiV1CommandTypes {
  SEND_HTTP_REQUEST = "SEND_HTTP_REQUEST-47406dac-1dc9-4831-a20a-ac917a944ddb",
}
