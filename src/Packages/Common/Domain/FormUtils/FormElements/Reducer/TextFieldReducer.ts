import { FormElementEvent, TextFieldState } from "Packages/Common/Domain/FormUtils/FormElements/Types";
import { internalFormElementReducer } from "Packages/Common/Domain/FormUtils/FormElements/Reducer/InternalFormElementReducer";
import { Reducer } from "redux";
import { createTextFieldState } from "Packages/Common/Domain/FormUtils/FormElements/FormElementStateFactory";

type PartialInitialState = Partial<Omit<TextFieldState, "type">>;

export const textFieldReducer = createTextFieldReducer();

export function createTextFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<TextFieldState> {
    const initialState: TextFieldState = createTextFieldState(partialInitialState);
    return function (state: TextFieldState = initialState, event: FormElementEvent): TextFieldState {
        return internalFormElementReducer<TextFieldState>(state, event);
    };
}
