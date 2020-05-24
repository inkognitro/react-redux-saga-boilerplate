import { Action } from "redux";

export enum MessageTypes {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

export type Placeholders = {
    [key: string]: string;
}

export type Translation = {
    translationId: string
    placeholders?: Placeholders,
    fallback?: string,
}

export type Message = {
    id: string;
    type: MessageTypes;
    content: Translation,
}

export type FieldMessage = {
    path: (string | number)[] // e.g. ['users', 0, 'username']
    message: Message
}

export type BusinessLogicResult<Data> = {
    generalMessages?: Message[]
    fieldMessages?: FieldMessage[]
    data: Data
}

export type Command<Type = any, Payload = undefined> = Action<Type> & {
    payload: Payload;
}

export type Event<Type = any, Payload = undefined> = Action<Type> & {
    payload: Payload;
}
