import { Event } from "Packages/Entity/CommonTypes";
import { FormElementEventTypes, FormElementState } from "../Types";

export function createFormElementStateWasChanged(
    formElement: FormElementState,
    stateChanges: object,
): FormElementStateWasChanged {
    return {
        type: FormElementEventTypes.FORM_ELEMENT_STATE_WAS_CHANGED,
        payload: { formElement, stateChanges },
    };
}

export type FormElementStateWasChanged = Event<FormElementEventTypes.FORM_ELEMENT_STATE_WAS_CHANGED, {
    formElement: FormElementState,
    stateChanges: Partial<FormElementState>;
}>;
