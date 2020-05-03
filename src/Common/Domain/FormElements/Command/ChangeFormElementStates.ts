import { Command } from "Common/Domain/Bus/Command";
import { FormElementCommandTypes, MultipleFormElementStateChanges } from "Common/Domain/FormElements/Types";

export function createChangeFormElementStates(multipleStateChanges: MultipleFormElementStateChanges): ChangeFormElementStates {
    return {
        type: FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATES,
        payload: { multipleStateChanges },
    };
}

export type ChangeFormElementStates = Command<FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATES, {
    multipleStateChanges: MultipleFormElementStateChanges;
}>;
