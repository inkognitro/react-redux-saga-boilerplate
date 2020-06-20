import { Reducer } from "redux";
import { EmailFieldState } from "../Types";
import { internalFormElementReducer } from "./InternalFormElementReducer";
import { createEmailFieldState } from "../FormElementStateFactory";
import { FormElementStateWasChanged } from "../Event/FormElementStateWasChanged";
import { FormElementStatesWereChanged } from "../Event/FormElementStatesWereChanged";

type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged)
type PartialInitialState = Partial<Omit<EmailFieldState, "type">>;

export const emailFieldReducer = createEmailFieldReducer();

export function createEmailFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<EmailFieldState> {
    const initialState: EmailFieldState = createEmailFieldState(partialInitialState);
    return function (state: EmailFieldState = initialState, event: FormElementEvent): EmailFieldState {
        return internalFormElementReducer<EmailFieldState>(state, event);
    };
}
