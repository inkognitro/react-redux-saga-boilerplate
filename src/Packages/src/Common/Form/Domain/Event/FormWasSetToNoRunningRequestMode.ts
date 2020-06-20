import { Event } from "Packages/Entity/CommonTypes";
import { FormEventTypes } from "./Types";

export function createFormWasSetToNoRunningRequestMode(formId: string): FormWasSetToNoRunningRequestMode {
    return {
        type: FormEventTypes.FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE,
        payload: { formId },
    };
}

export type FormWasSetToNoRunningRequestMode = Event<FormEventTypes.FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE, {
    formId: string
}>;
