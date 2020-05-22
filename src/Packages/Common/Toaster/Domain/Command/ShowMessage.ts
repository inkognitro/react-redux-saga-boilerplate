import { ToasterCommandTypes, ToastTypes } from "Packages/Common/Toaster/Domain/Types";
import {Command, Translation} from "Packages/Common/Types";

export function createShowMessage(settings: ShowMessageSettings): ShowMessage {
    return {
        type: ToasterCommandTypes.SHOW_MESSAGE,
        payload: settings,
    };
}

export type ShowMessage = Command<
  ToasterCommandTypes.SHOW_MESSAGE,
  ShowMessageSettings
>;

export type ShowMessageSettings = {
  id?: string;
  toastType: ToastTypes;
  content: Translation;
  canBeClosedManually?: boolean;
  automaticCloseDelayInMs?: null | number;
  mustBeShownInSeparateToast?: boolean;
};
