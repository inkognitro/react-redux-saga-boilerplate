import { Response } from "packages/common/HttpFoundation/Domain";
import { FieldMessage, Message } from "packages/entity/common-types";

export type BasicResponseBody = {
  generalMessages?: Message[];
  fieldMessages?: FieldMessage[];
};

export type ApiV1Response<Body = {}> = Response<(BasicResponseBody & Body)>
export type ApiV1ReadResponse<Data = {}> = ApiV1Response<{data: Data}>
