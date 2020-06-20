import { Action } from "redux";

export enum MessageTypes {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

export type Placeholders = {
    [key: string]: string
}

export enum TranslationIds {
    COULD_NOT_CONNECT_TO_SERVER = 'couldNotConnectToServer',
    BACK_TO_START = 'backToStart',
    PAGE_NOT_FOUND_TITLE = 'pageNotFoundTitle',
    LOADING = 'Loading..',
}

export type Translation = {
    translationId: (TranslationIds | string)
    placeholders?: Placeholders
    fallback?: string
}

export type Message = {
    id: string;
    type: MessageTypes
    content: Translation
}

export type FieldMessage = {
    path: (string | number)[] // e.g. ['users', 0, 'username']
    message: Message
}

export type Command<Type = any, Payload = undefined> = Action<Type> & {
    payload: Payload
}

export type Event<Type = any, Payload = undefined> = Action<Type> & {
    payload: Payload
}

export enum ResultTypes {
    SUCCESS = 'success',
    ERROR = 'error',
}

type ResultProps<Data> = {
    generalMessages: Message[]
    fieldMessages: FieldMessage[]
    data: Data
}

type BaseResult<Type extends ResultTypes, Data> = ({ type: Type } & ResultProps<Data>)
export type SuccessResult<Data = undefined> = BaseResult<ResultTypes.SUCCESS, Data>;
export type ErrorResult<Data = undefined> = BaseResult<ResultTypes.ERROR, Data>;
export type Result<Data = any> = (SuccessResult<Data> | ErrorResult<Data>);

export type ResultPropsForCreation<Data> = Partial<ResultProps<Data>> & Pick<ResultProps<Data>, 'data'>;
export function createErrorResult<Data = undefined>(settings: ResultPropsForCreation<Data>): ErrorResult<Data> {
    return {
        type: ResultTypes.ERROR,
        generalMessages: [],
        fieldMessages: [],
        ...settings,
    };
}

export function createSuccessResult<Data = undefined>(settings: ResultPropsForCreation<Data>): SuccessResult<Data> {
    return {
        type: ResultTypes.SUCCESS,
        generalMessages: [],
        fieldMessages: [],
        ...settings,
    };
}
