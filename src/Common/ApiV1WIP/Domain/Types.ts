import {HttpRequest, HttpResponse} from "Common/RequestHandler/Domain/Types";

export type BasicResponseBody = {
    generalMessages?: Message[],
    fieldMessages?: FieldMessage[],
};

export type ReadResponseBody<Data = any> = (BasicResponseBody & {
    data: Data,
});

export type ApiV1HttpRequest = HttpRequest;
export type ApiV1HttpResponse = HttpResponse<BasicResponseBody>;

export enum MessageTypes {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export type Message = {
    id: string,
    type: MessageTypes,
    translationId: string,
    defaultText: string,
    placeholders?: {
        [key: string]: string;
    },
};

export enum ApiV1EventTypes {
    API_V1_HTTP_SUCCESS_RESPONSE_WAS_RECEIVED = 'API_V1_HTTP_SUCCESS_RESPONSE_WAS_RECEIVED-47406dac-1dc9-4831-a20a-ac917a944ddb',
}

export type FieldMessage = {
    path: (string | number)[], //e.g. ['users', 0, 'username']
    message: Message
};