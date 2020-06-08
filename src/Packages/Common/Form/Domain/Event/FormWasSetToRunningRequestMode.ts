import { Event } from "Packages/Entity/CommonTypes";
import { FormEventTypes } from "../Types";

export function createFormWasSetToRunningRequestMode(formId: string): FormWasSetToRunningRequestMode {
    return {
        type: FormEventTypes.FORM_WAS_SET_TO_RUNNING_REQUEST_MODE,
        payload: { formId },
    };
}

export type FormWasSetToRunningRequestMode = Event<FormEventTypes.FORM_WAS_SET_TO_RUNNING_REQUEST_MODE, {
    formId: string
}>;
