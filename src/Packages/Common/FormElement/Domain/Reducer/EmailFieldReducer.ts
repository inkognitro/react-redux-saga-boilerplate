import { Reducer } from "redux";
import { EmailFieldState, FormElementEvent } from "../Types";
import { internalFormElementReducer } from "./InternalFormElementReducer";
import { createEmailFieldState } from "../FormElementStateFactory";

type PartialInitialState = Partial<Omit<EmailFieldState, "type">>;

export const emailFieldReducer = createEmailFieldReducer();

export function createEmailFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<EmailFieldState> {
    const initialState: EmailFieldState = createEmailFieldState(partialInitialState);
    return function (state: EmailFieldState = initialState, event: FormElementEvent): EmailFieldState {
        return internalFormElementReducer<EmailFieldState>(state, event);
    };
}
