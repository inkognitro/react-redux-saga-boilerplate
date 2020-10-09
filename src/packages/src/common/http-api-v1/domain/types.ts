import { Response } from "packages/common/http-foundation/domain";
import { FieldMessage, Message } from "packages/entity/common-types";
import { EndpointSchema } from "./endpoint/types";

export enum ApiV1RequestTypes {
    SINGLE_REQUEST = 'SINGLE_REQUEST',
}

type GenericApiV1Request<T extends ApiV1RequestTypes, P extends object> = {
    id: string
    type: T
    payload: P
}

export type ApiV1SingleRequest<
    E extends EndpointSchema = any,
    Q extends object = {},
    B extends object = {}
> = GenericApiV1Request<ApiV1RequestTypes.SINGLE_REQUEST, {
    endpoint: E
    queryParameters: Q
    body: B
}>

export type ApiV1Request = ApiV1SingleRequest

export type ApiV1Response<Body extends object = {}> = Response<Body & {
    generalMessages: Message[]
    fieldMessages: FieldMessage[]
}>

export type ApiV1RequestResponse<Req extends ApiV1Request = any, Res extends Response = any> = {
    request: Req
    response: Res | undefined
}

export type HttpApiV1StateSelector = (state: any) => HttpApiV1State

export type HttpApiV1State = {
    baseUrl: string
}
