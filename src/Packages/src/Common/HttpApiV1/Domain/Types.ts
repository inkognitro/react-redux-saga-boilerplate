import { Response } from "Packages/Common/HttpFoundation/Domain";
import { FieldMessage, Message } from "Packages/Entity/CommonTypes";

export type BasicResponseBody = {
  generalMessages?: Message[];
  fieldMessages?: FieldMessage[];
};

export type ApiV1Response<Body = {}> = Response<(BasicResponseBody & Body)>
export type ApiV1ReadResponse<Data = {}> = ApiV1Response<{data: Data}>
