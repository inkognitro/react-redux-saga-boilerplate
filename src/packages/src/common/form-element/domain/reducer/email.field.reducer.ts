import { Reducer } from "redux";
import { EmailFieldState } from "../types";
import { internalFormElementReducer } from "./internal.form.element.reducer";
import { createEmailFieldState } from "../form.element.state.factory";
import { FormElementStatesWereChanged, FormElementStateWasChanged } from "../event";

type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged)
type PartialInitialState = Partial<Omit<EmailFieldState, "type">>;

export const emailFieldReducer = createEmailFieldReducer();

export function createEmailFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<EmailFieldState> {
    const initialState: EmailFieldState = createEmailFieldState(partialInitialState);
    return function (state: EmailFieldState = initialState, event: FormElementEvent): EmailFieldState {
        return internalFormElementReducer<EmailFieldState>(state, event);
    };
}
