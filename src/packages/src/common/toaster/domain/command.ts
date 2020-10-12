import { Command, Translation } from 'packages/common/types/util/domain';
import { ToastTypes } from './types';

export enum ToasterCommandTypes {
    SHOW_MESSAGE = 'SHOW_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343',
    REMOVE_MESSAGE = 'REMOVE_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343',
}

export type RemoveMessage = Command<ToasterCommandTypes.REMOVE_MESSAGE, { messageId: string }>;
export function createRemoveMessage(messageId: string): RemoveMessage {
    return {
        type: ToasterCommandTypes.REMOVE_MESSAGE,
        payload: { messageId },
    };
}

export type ShowMessage = Command<ToasterCommandTypes.SHOW_MESSAGE, ShowMessageSettings>;
export function createShowMessage(settings: ShowMessageSettings): ShowMessage {
    return {
        type: ToasterCommandTypes.SHOW_MESSAGE,
        payload: settings,
    };
}

export type ShowMessageSettings = {
    id?: string;
    toastType: ToastTypes;
    content: Translation | string;
    canBeClosedManually?: boolean;
    automaticCloseDelayInMs?: null | number;
    mustBeShownInSeparateToast?: boolean;
};
