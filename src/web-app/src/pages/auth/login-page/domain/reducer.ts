import { RouterEventTypes, CurrentUrlWasChanged } from "packages/common/router/domain";
import {
    createPasswordFieldState,
    createTextFieldState,
    createCheckboxState,
    FormElementEvent,
    FormElementEventTypes,
} from "packages/common/form-element/domain";
import { formReducer, createFormState } from "packages/common/form/domain";
import { LoginPageState } from "./types";

const initialLoginPageState: LoginPageState = {
    form: createFormState({
        content: {
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
