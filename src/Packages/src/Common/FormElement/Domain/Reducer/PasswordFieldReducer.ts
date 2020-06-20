import { Reducer } from "redux";
import { PasswordFieldState } from "../Types";
import { internalFormElementReducer } from "./InternalFormElementReducer";
import { createPasswordFieldState } from "../FormElementStateFactory";
import { FormElementStateWasChanged } from "../Event/FormElementStateWasChanged";
import { FormElementStatesWereChanged } from "../Event/FormElementStatesWereChanged";

type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged)
type PartialInitialState = Partial<Omit<PasswordFieldState, "type">>;

export const passwordFieldReducer = createPasswordFieldReducer();

export function createPasswordFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<PasswordFieldState> {
    const initialState: PasswordFieldState = createPasswordFieldState(partialInitialState);
    return function (state: PasswordFieldState = initialState, event: FormElementEvent): PasswordFieldState {
        return internalFormElementReducer<PasswordFieldState>(state, event);
    };
}
