import { Command, Translation } from "packages/entity/common-types";
import { ToastTypes } from "./types";

export enum ToasterCommandTypes {
    SHOW_MESSAGE = "SHOW_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343",
    REMOVE_MESSAGE = "REMOVE_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343",
}

export function createRemoveMessage(messageId: string): RemoveMessage {
    return {
        type: ToasterCommandTypes.REMOVE_MESSAGE,
        payload: { messageId },
    };
}

export type RemoveMessage = Command<ToasterCommandTypes.REMOVE_MESSAGE, {
    messageId: string;
}>;

export function createShowMessage(settings: ShowMessageSettings): ShowMessage {
    return {
        type: ToasterCommandTypes.SHOW_MESSAGE,
        payload: settings,
    };
}

export type ShowMessage = Command<ToasterCommandTypes.SHOW_MESSAGE, ShowMessageSettings>;

export type ShowMessageSettings = {
    id?: string;
    toastType: ToastTypes;
    content: Translation;
    canBeClosedManually?: boolean;
    automaticCloseDelayInMs?: null | number;
    mustBeShownInSeparateToast?: boolean;
};
