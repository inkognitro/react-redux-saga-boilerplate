import { FormEvent, FormEventTypes, FormState } from "Common/Domain/Form/Types";

export function formReducer(state: FormState, event?: FormEvent): FormState {
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
    return state;
}
