import { HomePageState } from "SinglePageApp/Domain/Routing/HomePage/Types";
import { CurrentUrlWasChanged } from "Common/Domain/Router/Event/CurrentUrlWasChanged";
import { RouterEventTypes } from "Common/Domain/Router/Types";
import { createTextFieldState } from "Common/Domain/FormUtils/FormElements/FormElementStateFactory";
import { FormElementEvent, FormElementEventTypes } from "Common/Domain/FormUtils/FormElements/Types";
import { textFieldReducer } from "Common/Domain/FormUtils/FormElements/Reducer/TextFieldReducer";

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
