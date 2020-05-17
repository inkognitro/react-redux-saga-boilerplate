import { Translation } from "./Translation";

export enum MessageTypes {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

export type Message = {
    id: string;
    type: MessageTypes;
    content: Translation,
}
