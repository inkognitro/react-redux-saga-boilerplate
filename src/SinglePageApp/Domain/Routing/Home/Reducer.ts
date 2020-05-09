import { HomeState } from "SinglePageApp/Domain/Routing/Home/Types";
import { CurrentUrlWasChanged } from "Common/Domain/Router/Event/CurrentUrlWasChanged";
import { RouterEventTypes } from "Common/Domain/Router/Types";
import { createTextFieldState } from "Common/Domain/FormUtils/FormElements/FormElementStateFactory";
import { FormElementEvent, FormElementEventTypes } from "Common/Domain/FormUtils/FormElements/Types";
import { textFieldReducer } from "Common/Domain/FormUtils/FormElements/Reducer/TextFieldReducer";

const initialHomeState: HomeState = {
    toastContentField: createTextFieldState({ value: 'Hi there :)' }),
};

type Event = (CurrentUrlWasChanged | FormElementEvent);

export function homeReducer(state: HomeState = initialHomeState, event?: Event): HomeState {
    if (!event) {
        return state;
    }

    console.log('event', event);

    if (event.type === RouterEventTypes.CURRENT_URL_WAS_CHANGED) {
        console.log('url was changed to ', event.payload.url);
        return initialHomeState;
    }
    if (Object.values(FormElementEventTypes).includes(event.type)) {
        return {
            ...state,
            toastContentField: textFieldReducer(state.toastContentField, event),
        };
    }
    return state;
}
