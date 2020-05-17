import {
    FormElementsByName, FormEvent, FormEventTypes, FormState,
} from "Packages/Common/Domain/FormUtils/Form/Types";
import { FormElementEvent, FormElementEventTypes } from "Packages/Common/Domain/FormUtils/FormElements/Types";
import { formElementReducer } from "Packages/Common/Domain/FormUtils/FormElements/Reducer/FormElementReducer";

export function formReducer<SpecificElementsByName>(
    state: FormState<SpecificElementsByName>,
    event?: (FormEvent | FormElementEvent),
): FormState<SpecificElementsByName> {
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
        // @ts-ignore
        const elementsByName: FormElementsByName<SpecificElementsByName> = {};
        for (const name in state.elementsByName) {
            const formElementState = state.elementsByName[name];
            // @ts-ignore
            elementsByName[name] = formElementReducer(formElementState, event);
        }
        return {
            ...state,
            elementsByName,
        };
    }
    return state;
}
