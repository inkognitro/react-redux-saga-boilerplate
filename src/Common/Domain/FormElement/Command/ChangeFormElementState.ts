import { Command } from "Common/Domain/Bus/Command";
import { FormElementCommandTypes, FormElementState } from "Common/Domain/FormElement/Types";

export function createChangeFormElementState(formElementId: string, stateChanges: object): ChangeFormElementState {
    return {
        type: FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATE,
        payload: { formElementId, stateChanges },
    };
}

export type ChangeFormElementState = Command<FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATE, {
    formElementId: string,
    stateChanges: Partial<FormElementState>;
}>;
