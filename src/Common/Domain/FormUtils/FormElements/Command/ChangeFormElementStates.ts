import { Command } from "Common/Domain/Bus/Command";
import {
    FormElementCommandTypes,
    FormElementStateChanges,
} from "Common/Domain/FormUtils/FormElements/Types";

export function createChangeFormElementStates(multipleStateChanges: FormElementStateChanges[]): ChangeFormElementStates {
    return {
        type: FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATES,
        payload: { multipleStateChanges },
    };
}

export type ChangeFormElementStates = Command<FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATES, {
    multipleStateChanges: FormElementStateChanges[];
}>;
