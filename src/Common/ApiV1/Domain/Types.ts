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

export type FieldMessage = {
    path: (string | number)[], //e.g. ['users', 0, 'username']
    message: Message
};