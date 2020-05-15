import { HttpResponse } from "Common/Domain/RequestHandling/Base/Http/Types";
import { Message } from "Common/Domain/Model/Message";

export type BasicResponseBody = {
  generalMessages?: Message[];
  fieldMessages?: FieldMessage[];
};

export type ApiV1Response<Body = {}> = HttpResponse<(BasicResponseBody & Body)>
export type ApiV1ReadResponse<Data = {}> = HttpResponse<(BasicResponseBody & {data: Data})>

export enum ApiV1HttpEventTypes {
  API_V1_HTTP_RESPONSE_WAS_RECEIVED = "API_V1_HTTP_RESPONSE_WAS_RECEIVED-47406dac-1dc9-4831-a20a-ac917a944ddb",
  API_V1_HTTP_CONNECTION_FAILED = "API_V1_HTTP_CONNECTION_FAILED-47406dac-1dc9-4831-a20a-ac917a944ddb",
}

export type FieldMessage = {
  path: (string | number)[]; // e.g. ['users', 0, 'username']
  message: Message;
};
