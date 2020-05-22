import { HomePageState } from "Apps/WebSPA/Routing/HomePage/Domain/Types";
import { CurrentUrlWasChanged } from "Packages/Common/Router/Domain/Event/CurrentUrlWasChanged";
import { RouterEventTypes } from "Packages/Common/Router/Domain/Types";
import { createTextFieldState } from "Packages/Common/FormElement/Domain/FormElementStateFactory";
import { FormElementEvent, FormElementEventTypes } from "Packages/Common/FormElement/Domain/Types";
import { textFieldReducer } from "Packages/Common/FormElement/Domain/Reducer/TextFieldReducer";

const initialHomePageState: HomePageState = {
    toastContent: createTextFieldState({ value: 'Hi there :)' }),
};

type Event = (CurrentUrlWasChanged | FormElementEvent);

export function homePageReducer(state: HomePageState = initialHomePageState, event?: Event): HomePageState {
    if (!event) {
        return state;
    }
    if (event.type === RouterEventTypes.CURRENT_URL_WAS_CHANGED) {
        return initialHomePageState;
    }
    if (Object.values(FormElementEventTypes).includes(event.type)) {
        return {
            ...state,
            toastContent: textFieldReducer(state.toastContent, event),
        };
    }
    return state;
}
