import { FormElementEventTypes } from "packages/common/form-element/domain";
import { FormElementState, FormElementStateChanges } from "../types";
import { FormElementStatesWereChanged, FormElementStateWasChanged } from "../event";

type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged)

export function internalFormElementReducer<SpecificFormElementState>(
    state: (SpecificFormElementState & FormElementState),
    event?: FormElementEvent,
): (SpecificFormElementState & FormElementState) {
    if (!event) {
        return state;
    }
    if (event.type === FormElementEventTypes.FORM_ELEMENT_STATE_WAS_CHANGED && state.id === event.payload.formElement.id) {
        return {
            ...state,
            ...event.payload.stateChanges,
        };
    }
    if (event.type === FormElementEventTypes.FORM_ELEMENT_STATES_WERE_CHANGED) {
        if (event.payload.multipleStateChanges.length === 0) {
            return state;
        }
        const initialStateChanges: FormElementStateChanges = {
            formElement: state,
            stateChanges: {},
        };
        const mergedFormElementStateChanges = event.payload.multipleStateChanges.reduce(
            (mergedFormElementStateChanges, formElementStateChanges): FormElementStateChanges => {
                if (formElementStateChanges.formElement.id !== state.id) {
                    return mergedFormElementStateChanges;
                }
                return {
                    formElement: mergedFormElementStateChanges.formElement,
                    // @ts-ignore
                    stateChanges: {
                        ...mergedFormElementStateChanges.stateChanges,
                        ...formElementStateChanges.stateChanges,
                    },
                };
            },
            initialStateChanges,
        );
        return {
            ...state,
            ...mergedFormElementStateChanges.stateChanges,
        };
    }
    return state;
}
