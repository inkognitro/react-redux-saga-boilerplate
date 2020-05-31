import { Command, Translation } from "Packages/Common/CommonTypes";
import { ToasterCommandTypes, ToastTypes } from "../Types";

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
