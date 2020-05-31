import { Command } from "Packages/Common/CommonTypes";
import {
    FormElementCommandTypes,
    FormElementStateChanges,
} from "../Types";

export function createChangeFormElementStates(multipleStateChanges: FormElementStateChanges[]): ChangeFormElementStates {
    return {
        type: FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATES,
        payload: { multipleStateChanges },
    };
}

export type ChangeFormElementStates = Command<FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATES, {
    multipleStateChanges: FormElementStateChanges[];
}>;
