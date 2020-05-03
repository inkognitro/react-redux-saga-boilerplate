import { FormElementEvents, TextFieldState } from "Common/Domain/FormElements/Types";
import { formElementReducer } from "Common/Domain/FormElements/Reducer/FormElementReducer";
import { Reducer } from "redux";
import { createTextFieldState } from "Common/Domain/FormElements/FormElementStateFactory";

type PartialInitialState = Partial<Omit<TextFieldState, "type">>;

export function createTextFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<TextFieldState> {
    const initialState: TextFieldState = createTextFieldState(partialInitialState);
    return function (state: TextFieldState = initialState, event: FormElementEvents): TextFieldState {
        return formElementReducer<TextFieldState>(state, event);
    };
}
