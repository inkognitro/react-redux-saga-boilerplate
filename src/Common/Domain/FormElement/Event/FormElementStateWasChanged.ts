import { Event } from "Common/Domain/Bus/Event";
import { FormElementEventTypes } from "Common/Domain/FormElement/Types";

export function createFormElementStateWasChanged(
    formElementId: string,
    stateChanges: object,
): FormElementStateWasChanged<object> {
    return {
        type: FormElementEventTypes.FORM_ELEMENT_STATE_WAS_CHANGED,
        payload: { formElementId, stateChanges },
    };
}

export type FormElementStateWasChanged<FormElementState = object> = Event<FormElementEventTypes.FORM_ELEMENT_STATE_WAS_CHANGED, {
    formElementId: string,
    stateChanges: Partial<FormElementState>;
}>;
