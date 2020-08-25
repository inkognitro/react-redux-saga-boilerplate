import { Command } from "packages/entity/common-types";
import { FormElementState, FormElementStateChanges } from "./types";

export enum FormElementCommandTypes {
    CHANGE_FORM_ELEMENT_STATE = 'CHANGE_FORM_ELEMENT_STATE-1d8df24a-9de9-49c5-bcdc-659b5d4267e7',
    CHANGE_FORM_ELEMENT_STATES = 'CHANGE_FORM_ELEMENT_STATES-1d8df24a-9de9-49c5-bcdc-659b5d4267e7',
}

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

export function createChangeFormElementStates(multipleStateChanges: FormElementStateChanges[]): ChangeFormElementStates {
    return {
        type: FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATES,
        payload: { multipleStateChanges },
    };
}

export type ChangeFormElementStates = Command<FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATES, {
    multipleStateChanges: FormElementStateChanges[];
}>;
