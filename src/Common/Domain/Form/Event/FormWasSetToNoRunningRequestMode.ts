import { Event } from "Common/Domain/Bus/Event";
import { FormEventTypes } from "Common/Domain/Form/Types";

export function createFormWasSetToNoRunningRequestMode(formId: string): FormWasSetToNoRunningRequestMode {
    return {
        type: FormEventTypes.FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE,
        payload: { formId },
    };
}

export type FormWasSetToNoRunningRequestMode = Event<FormEventTypes.FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE, {
    formId: string
}>;
