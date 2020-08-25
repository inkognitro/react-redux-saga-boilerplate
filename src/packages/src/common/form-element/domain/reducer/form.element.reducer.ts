import { FormElementState, FormElementTypes } from "../types";
import { textFieldReducer } from "./text.field.reducer";
import { emailFieldReducer } from "./email.field.reducer";
import { passwordFieldReducer } from "./password.field.reducer";
import { checkboxReducer } from "./checkbox.reducer";
import { FormElementStatesWereChanged, FormElementStateWasChanged } from "../event";

type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged)

export function formElementReducer(state: FormElementState, event?: FormElementEvent): FormElementState {
    if (!event) {
        return state;
    }
    if (state.type === FormElementTypes.TEXT) {
        return textFieldReducer(state, event);
    }
    if (state.type === FormElementTypes.EMAIL) {
        return emailFieldReducer(state, event);
    }
    if (state.type === FormElementTypes.PASSWORD) {
        return passwordFieldReducer(state, event);
    }
    if (state.type === FormElementTypes.CHECKBOX) {
        return checkboxReducer(state, event);
    }
    // @ts-ignore
    throw new Error(`form element with type "${state.type}" not supported!`);
}
