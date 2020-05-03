import { FormElementEventTypes, FormElementState } from "Common/Domain/FormElement/Types";
import { FormElementStateWasChanged } from "Common/Domain/FormElement/Event/FormElementStateWasChanged";

export function formElementReducer(state: FormElementState, event?: FormElementStateWasChanged): FormElementState {
    if (!event) {
        return state;
    }
    if (state.id !== event.payload.formElementId) {
        return state;
    }
    if (event.type === FormElementEventTypes.FORM_ELEMENT_STATE_WAS_CHANGED) {
        return {
            ...state,
            ...event.payload.stateChanges,
        };
    }
    return state;
}
