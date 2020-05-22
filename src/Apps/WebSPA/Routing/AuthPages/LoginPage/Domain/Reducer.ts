import { CurrentUrlWasChanged } from "Packages/Common/Router/Domain/Event/CurrentUrlWasChanged";
import { RouterEventTypes } from "Packages/Common/Router/Domain/Types";
import {
    createPasswordFieldState,
    createTextFieldState,
} from "Packages/Common/FormElement/Domain/FormElementStateFactory";
import { FormElementEvent, FormElementEventTypes } from "Packages/Common/FormElement/Domain/Types";
import { LoginPageState } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Types";
import { createFormState } from "Packages/Common/Form/Domain/FormStateFactory";
import { formReducer } from "Packages/Common/Form/Domain/Reducer";

const initialLoginPageState: LoginPageState = {
    form: createFormState({
        elementsByName: {
            username: createTextFieldState({ value: 'sonGoku' }),
            password: createPasswordFieldState({ value: '1234' }),
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
