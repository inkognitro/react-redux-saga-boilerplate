import { Reducer } from "redux";
import { TextFieldState } from "../Types";
import { internalFormElementReducer } from "./InternalFormElementReducer";
import { createTextFieldState } from "../FormElementStateFactory";
import { FormElementStateWasChanged } from "../Event/FormElementStateWasChanged";
import { FormElementStatesWereChanged } from "../Event/FormElementStatesWereChanged";

type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged)
type PartialInitialState = Partial<Omit<TextFieldState, "type">>;

export const textFieldReducer = createTextFieldReducer();

export function createTextFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<TextFieldState> {
    const initialState: TextFieldState = createTextFieldState(partialInitialState);
    return function (state: TextFieldState = initialState, event: FormElementEvent): TextFieldState {
        return internalFormElementReducer<TextFieldState>(state, event);
    };
}
