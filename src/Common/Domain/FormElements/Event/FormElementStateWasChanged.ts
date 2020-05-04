import { Event } from "Common/Domain/Bus/Event";
import {FormElementEventTypes, FormElementState} from "Common/Domain/FormElements/Types";

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
