import { FormElementEvent, FormElementState, FormElementTypes } from "Packages/Common/FormElement/Domain/Types";
import { textFieldReducer } from "Packages/Common/FormElement/Domain/Reducer/TextFieldReducer";
import { emailFieldReducer } from "Packages/Common/FormElement/Domain/Reducer/EmailFieldReducer";
import { passwordFieldReducer } from "Packages/Common/FormElement/Domain/Reducer/PasswordFieldReducer";

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
    // @ts-ignore
    throw new Error(`form element with type "${state.type}" not supported!`);
}
