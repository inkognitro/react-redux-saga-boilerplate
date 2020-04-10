import {Command} from "Common/Domain/Bus/Command";
import {ToasterCommandTypes, ToastTypes} from "Common/Domain/Toaster/Types";

export function createShowMessage(settings: ShowMessageSettings): ShowMessage {
    return {
        type: ToasterCommandTypes.SHOW_MESSAGE,
        payload: settings,
    };
}

export type ShowMessage = Command<ToasterCommandTypes.SHOW_MESSAGE, ShowMessageSettings>;

export type ShowMessageSettings = {
    id?: string,
    toastType: ToastTypes,
    content: string,
    canBeClosedManually?: boolean,
    automaticCloseDelayInMs?: (null | number),
    mustBeShownInSeparateToast?: boolean,
};