import {
    FormElementEvent,
    FormElementEventTypes,
    FormElementState,
    FormElementStateChanges,
} from "Common/Domain/FormUtils/FormElements/Types";

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
        const mergedStateChanges = event.payload.multipleStateChanges.reduce(
            (mergedStateChanges, stateChanges) => {
                if (mergedStateChanges.formElement.id !== state.id) {
                    return mergedStateChanges;
                }
                return {
                    ...mergedStateChanges,
                    ...stateChanges.stateChanges,
                };
            },
            initialStateChanges,
        );
        return {
            ...state,
            ...mergedStateChanges,
        };
    }
    return state;
}
