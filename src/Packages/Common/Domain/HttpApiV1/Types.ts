import { Response } from "Packages/Common/Domain/HttpFoundation/Types";
import { Message } from "Packages/../../../../Entity/Domain/Message/Message";

export type BasicResponseBody = {
  generalMessages?: Message[];
  fieldMessages?: FieldMessage[];
};

export type ApiV1Response<Body = {}> = Response<(BasicResponseBody & Body)>
export type ApiV1ReadResponse<Data = {}> = Response<(BasicResponseBody & {data: Data})>

export enum HttpApiV1EventTypes {
  API_V1_HTTP_RESPONSE_WAS_RECEIVED = "API_V1_HTTP_RESPONSE_WAS_RECEIVED-47406dac-1dc9-4831-a20a-ac917a944ddb",
  API_V1_HTTP_CONNECTION_FAILED = "API_V1_HTTP_CONNECTION_FAILED-47406dac-1dc9-4831-a20a-ac917a944ddb",
}

export type FieldMessage = {
  path: (string | number)[]; // e.g. ['users', 0, 'username']
  message: Message;
};
