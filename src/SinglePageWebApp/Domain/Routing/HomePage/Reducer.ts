import { HomePageState } from "SinglePageWebApp/Domain/Routing/HomePage/Types";
import { CurrentUrlWasChanged } from "Packages/Common/Domain/Router/Event/CurrentUrlWasChanged";
import { RouterEventTypes } from "Packages/Common/Domain/Router/Types";
import { createTextFieldState } from "Packages/Common/Domain/FormUtils/FormElements/FormElementStateFactory";
import { FormElementEvent, FormElementEventTypes } from "Packages/Common/Domain/FormUtils/FormElements/Types";
import { textFieldReducer } from "Packages/Common/Domain/FormUtils/FormElements/Reducer/TextFieldReducer";

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
