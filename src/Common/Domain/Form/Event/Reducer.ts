import {FormElementsByName, FormEvent, FormEventTypes, FormState} from "Common/Domain/Form/Types";
import {FormElementEvent, FormElementEventTypes} from "Common/Domain/FormElements/Types";
import {formElementReducer} from "Common/Domain/FormElements/Reducer/FormElementReducer";

export function formReducer(state: FormState, event?: (FormEvent | FormElementEvent)): FormState {
    if (!event) {
        return state;
    }
    if (event.type === FormEventTypes.FORM_WAS_SET_TO_RUNNING_REQUEST_MODE) {
        return {
            ...state,
            isRequestRunning: true,
        };
    }
    if (event.type === FormEventTypes.FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE) {
        return {
            ...state,
            isRequestRunning: false,
        };
    }
    if (event.type === FormElementEventTypes.FORM_ELEMENT_STATE_WAS_CHANGED) {
        const elementsByName: FormElementsByName = {};
        for (const name in state.elementsByName) {
            const formElementState = state.elementsByName[name];
            elementsByName[name] = formElementReducer(formElementState, event);
        }
        return {
            ...state,
            elementsByName,
        };
    }
    return state;
}
