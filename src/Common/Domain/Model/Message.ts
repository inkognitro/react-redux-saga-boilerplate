export enum MessageTypes {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

export type Message = {
    id: string;
    type: MessageTypes;
    content: {
        defaultText: string
        translationId?: string
        placeholders?: {
            [key: string]: string
        };
    },
}