export type BasicResponseBody = {
    generalMessages?: Message[],
    fieldMessages?: FieldMessage[],
};

export type ReadResponseBody<Data = any> = (BasicResponseBody & {
    data: Data,
});

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
    API_V1_HTTP_RESPONSE_WAS_RECEIVED = 'API_V1_HTTP_RESPONSE_WAS_RECEIVED-47406dac-1dc9-4831-a20a-ac917a944ddb',
    API_V1_HTTP_CONNECTION_FAILED = 'API_V1_HTTP_CONNECTION_FAILED-47406dac-1dc9-4831-a20a-ac917a944ddb',
}

export type FieldMessage = {
    path: (string | number)[], //e.g. ['users', 0, 'username']
    message: Message
};