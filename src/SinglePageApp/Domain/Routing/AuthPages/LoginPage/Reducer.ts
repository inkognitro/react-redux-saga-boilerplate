import { CurrentUrlWasChanged } from "Common/Domain/Router/Event/CurrentUrlWasChanged";
import { RouterEventTypes } from "Common/Domain/Router/Types";
import {
    createPasswordFieldState,
    createTextFieldState,
} from "Common/Domain/FormUtils/FormElements/FormElementStateFactory";
import { FormElementEvent, FormElementEventTypes } from "Common/Domain/FormUtils/FormElements/Types";
import { LoginPageState } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Types";
import { createFormState } from "Common/Domain/FormUtils/Form/FormStateFactory";
import { formReducer } from "Common/Domain/FormUtils/Form/Event/Reducer";

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
