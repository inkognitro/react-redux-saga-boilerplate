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
    NOT_AUTHORIZED = 'notAuthorized',
    LOADING = 'Loading..',
    LOGIN_TITLE = 'Login',
    LOGIN = 'login',
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

export type FieldMessagePath = (string | number)[] // e.g. ['users', 0, 'username']

export type FieldMessage = {
    path: FieldMessagePath
    message: Message
}

export type Command<Type = any, Payload = undefined> = Action<Type> & { payload: Payload }
export type Event<Type = any, Payload = undefined> = Action<Type> & { payload: Payload }

export enum ResultTypes {
    SUCCESS = 'success',
    ERROR = 'error',
}

type ResultProps<Data> = {
    generalMessages: Message[]
    fieldMessages: FieldMessage[]
    data: Data
}

type GenericResult<Type extends ResultTypes, Data> = ({ type: Type } & ResultProps<Data>)
export type SuccessResult<Data = undefined> = GenericResult<ResultTypes.SUCCESS, Data>
export type ErrorResult<Data = undefined> = GenericResult<ResultTypes.ERROR, Data>
export type Result = (SuccessResult | ErrorResult)

export type ResultCreationSettings<Data = any> = Partial<ResultProps<Data>> & Pick<ResultProps<Data>, 'data'>;

export function createErrorResult<Data = undefined>(settings: ResultCreationSettings<Data>): ErrorResult<Data> {
    return {
        type: ResultTypes.ERROR,
        generalMessages: settings.generalMessages ? settings.generalMessages : [],
        fieldMessages: settings.fieldMessages ? settings.fieldMessages : [],
        ...settings,
    };
}

export function createSuccessResult<Data = undefined>(settings: ResultCreationSettings<Data>): SuccessResult<Data> {
    return {
        type: ResultTypes.SUCCESS,
        generalMessages: settings.generalMessages ? settings.generalMessages : [],
        fieldMessages: settings.fieldMessages ? settings.fieldMessages : [],
        ...settings,
    };
}
