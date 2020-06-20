import { FormElementState, FormElementTypes } from "../Types";
import { textFieldReducer } from "./TextFieldReducer";
import { emailFieldReducer } from "./EmailFieldReducer";
import { passwordFieldReducer } from "./PasswordFieldReducer";
import { checkboxReducer } from "./CheckboxReducer";
import { FormElementStateWasChanged } from "../Event/FormElementStateWasChanged";
import { FormElementStatesWereChanged } from "../Event/FormElementStatesWereChanged";

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
