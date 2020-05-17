import { CurrentUrlWasChanged } from "Packages/Common/Domain/Router/Event/CurrentUrlWasChanged";
import { RouterEventTypes } from "Packages/Common/Domain/Router/Types";
import {
    createPasswordFieldState,
    createTextFieldState,
} from "Packages/Common/Domain/FormElement/FormElementStateFactory";
import { FormElementEvent, FormElementEventTypes } from "Packages/Common/Domain/FormElement/Types";
import { LoginPageState } from "SinglePageWebApp/Domain/Routing/AuthPages/LoginPage/Types";
import { createFormState } from "Packages/Common/Domain/Form/FormStateFactory";
import { formReducer } from "Packages/Common/Domain/Form/Event/Reducer";

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
