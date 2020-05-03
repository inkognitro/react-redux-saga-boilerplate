import { Command } from "Common/Domain/Bus/Command";
import { FormElementCommandTypes, FormElementState } from "Common/Domain/FormElements/Types";

export function createChangeFormElementState(
    formElementId: string,
    stateChanges: Partial<FormElementState>,
): ChangeFormElementState {
    return {
        type: FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATE,
        payload: { formElementId, stateChanges },
    };
}

export type ChangeFormElementState = Command<FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATE, {
    formElementId: string,
    stateChanges: Partial<FormElementState>;
}>;
