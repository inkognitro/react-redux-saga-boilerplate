import { FormElementEvent, FormElementState, FormElementTypes } from "Common/Domain/FormUtils/FormElements/Types";
import { textFieldReducer } from "Common/Domain/FormUtils/FormElements/Reducer/TextFieldReducer";
import { emailFieldReducer } from "Common/Domain/FormUtils/FormElements/Reducer/EmailFieldReducer";
import { passwordFieldReducer } from "Common/Domain/FormUtils/FormElements/Reducer/PasswordFieldReducer";

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
