import { FormElementEventTypes, FormElementState } from "Packages/Common/FormElement/Domain/Types";
import {Event} from "Packages/Common/CommonTypes";

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
