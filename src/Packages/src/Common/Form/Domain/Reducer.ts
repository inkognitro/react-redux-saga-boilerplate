import { FormElementEvent, FormElementEventTypes, formElementReducer } from "Packages/Common/FormElement/Domain";
import { FormElementsByName, FormState } from "./Types";
import { FormEventTypes } from "./Event/Types";
import { FormWasSetToRunningRequestMode } from "./Event/FormWasSetToRunningRequestMode";
import { FormWasSetToNoRunningRequestMode } from "./Event/FormWasSetToNoRunningRequestMode";

type FormEvent = (FormWasSetToRunningRequestMode | FormWasSetToNoRunningRequestMode);

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
    if (Object.values(FormElementEventTypes).includes(event.type)) {
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
