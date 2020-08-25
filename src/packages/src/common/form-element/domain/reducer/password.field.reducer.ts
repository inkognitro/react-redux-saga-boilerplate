import { Reducer } from "redux";
import { PasswordFieldState } from "../types";
import { internalFormElementReducer } from "./internal.form.element.reducer";
import { createPasswordFieldState } from "../form.element.state.factory";
import { FormElementStatesWereChanged, FormElementStateWasChanged } from "../event";

type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged)
type PartialInitialState = Partial<Omit<PasswordFieldState, "type">>;

export const passwordFieldReducer = createPasswordFieldReducer();

export function createPasswordFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<PasswordFieldState> {
    const initialState: PasswordFieldState = createPasswordFieldState(partialInitialState);
    return function (state: PasswordFieldState = initialState, event: FormElementEvent): PasswordFieldState {
        return internalFormElementReducer<PasswordFieldState>(state, event);
    };
}
