import { FormElementCommandTypes, FormElementState } from "Packages/Common/FormElement/Domain/Types";
import {Command} from "Packages/Common/CommonTypes";

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
