import { Event } from "Packages/Common/Domain/Bus/Event";
import { FormElementEventTypes, FormElementState } from "Packages/Common/Domain/FormUtils/FormElements/Types";

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
