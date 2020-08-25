import { Reducer } from "redux";
import { TextFieldState } from "../types";
import { internalFormElementReducer } from "./internal.form.element.reducer";
import { createTextFieldState } from "../form.element.state.factory";
import { FormElementStatesWereChanged, FormElementStateWasChanged } from "../event";

type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged)
type PartialInitialState = Partial<Omit<TextFieldState, "type">>;

export const textFieldReducer = createTextFieldReducer();

export function createTextFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<TextFieldState> {
    const initialState: TextFieldState = createTextFieldState(partialInitialState);
    return function (state: TextFieldState = initialState, event: FormElementEvent): TextFieldState {
        return internalFormElementReducer<TextFieldState>(state, event);
    };
}
