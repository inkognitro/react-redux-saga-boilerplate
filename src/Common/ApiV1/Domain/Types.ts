export type BasicResponse = {
    generalMessages?: Message[],
    fieldMessages?: FieldMessage[],
};

export type ReadResponse<Data = any> = (BasicResponse & {
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
    translationKey: string,
    translation: string,
};

export type FieldMessage = {
    path: (string | number)[], //e.g. ['users', 0, 'username']
    message: Message
};