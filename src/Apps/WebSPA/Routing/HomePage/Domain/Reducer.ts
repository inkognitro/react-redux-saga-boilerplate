import { RouterEventTypes, CurrentUrlWasChanged } from "Packages/Common/Router";
import {
    textFieldReducer,
    FormElementEvent,
    FormElementEventTypes,
    createTextFieldState,
} from "Packages/Common/FormElement";
import { HomePageState } from "./Types";

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
