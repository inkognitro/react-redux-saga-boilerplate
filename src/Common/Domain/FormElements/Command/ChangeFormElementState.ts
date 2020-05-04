import { Command } from "Common/Domain/Bus/Command";
import { FormElementCommandTypes, FormElementState } from "Common/Domain/FormElements/Types";

export function createChangeFormElementState(
    formElement: FormElementState,
    stateChanges: Partial<FormElementState>,
): ChangeFormElementState {
    return {
        type: FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATE,
        payload: { formElement, stateChanges },
    };
}

export type ChangeFormElementState = Command<FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATE, {
    formElement: FormElementState,
    stateChanges: Partial<FormElementState>;
}>;
