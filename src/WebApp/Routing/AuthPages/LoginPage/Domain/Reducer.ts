import { RouterEventTypes, CurrentUrlWasChanged } from "Packages/Common/Router";
import {
    createPasswordFieldState,
    createTextFieldState,
    createCheckboxState,
    FormElementEvent,
    FormElementEventTypes,
} from "Packages/Common/FormElement";
import { formReducer, createFormState } from "Packages/Common/Form";
import { LoginPageState } from "./Types";

const initialLoginPageState: LoginPageState = {
    form: createFormState({
        elementsByName: {
            username: createTextFieldState({ value: 'Nagato' }),
            password: createPasswordFieldState({ value: '1234' }),
            rememberMe: createCheckboxState({ value: true }),
        },
    }),
};

type Event = (CurrentUrlWasChanged | FormElementEvent);

export function loginPageReducer(state: LoginPageState = initialLoginPageState, event?: Event): LoginPageState {
    if (!event) {
        return state;
    }
    if (event.type === RouterEventTypes.CURRENT_URL_WAS_CHANGED) {
        return initialLoginPageState;
    }
    if (Object.values(FormElementEventTypes).includes(event.type)) {
        return {
            ...state,
            form: formReducer(state.form, event),
        };
    }
    return state;
}
