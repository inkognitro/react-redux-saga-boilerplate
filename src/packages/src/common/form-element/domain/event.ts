import { Event } from "packages/common/types/util/domain";
import { FormElementState, FormElementStateChanges } from "./types";

export enum FormElementEventTypes {
    FORM_ELEMENT_STATE_WAS_CHANGED = 'FORM_ELEMENT_STATE_WAS_CHANGED-beeac545-1968-4751-bb8d-4518e5536e66',
    FORM_ELEMENT_STATES_WERE_CHANGED = 'FORM_ELEMENT_STATES_WERE_CHANGED-beeac545-1968-4751-bb8d-4518e5536e66',
}

export type FormElementStateWasChanged = Event<FormElementEventTypes.FORM_ELEMENT_STATE_WAS_CHANGED, {
    formElement: FormElementState
    stateChanges: Partial<FormElementState>
}>

export function createFormElementStateWasChanged(
    formElement: FormElementState,
    stateChanges: object,
): FormElementStateWasChanged {
    return {
        type: FormElementEventTypes.FORM_ELEMENT_STATE_WAS_CHANGED,
        payload: { formElement, stateChanges },
    };
}

export type FormElementStatesWereChanged = Event<FormElementEventTypes.FORM_ELEMENT_STATES_WERE_CHANGED, {
    multipleStateChanges: FormElementStateChanges[]
}>
export function createFormElementStatesWereChanged(
    multipleStateChanges: FormElementStateChanges[],
): FormElementStatesWereChanged {
    return {
        type: FormElementEventTypes.FORM_ELEMENT_STATES_WERE_CHANGED,
        payload: { multipleStateChanges },
    };
}
