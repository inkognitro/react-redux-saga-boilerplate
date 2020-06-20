import { Command, Translation } from "Packages/Entity/CommonTypes";
import { ToastTypes } from "../Types";
import { ToasterCommandTypes } from "./Types";

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
