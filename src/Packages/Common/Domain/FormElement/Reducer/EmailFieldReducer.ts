import { EmailFieldState, FormElementEvent } from "Packages/Common/Domain/FormElement/Types";
import { internalFormElementReducer } from "Packages/Common/Domain/FormElement/Reducer/InternalFormElementReducer";
import { Reducer } from "redux";
import { createEmailFieldState } from "Packages/Common/Domain/FormElement/FormElementStateFactory";

type PartialInitialState = Partial<Omit<EmailFieldState, "type">>;

export const emailFieldReducer = createEmailFieldReducer();

export function createEmailFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<EmailFieldState> {
    const initialState: EmailFieldState = createEmailFieldState(partialInitialState);
    return function (state: EmailFieldState = initialState, event: FormElementEvent): EmailFieldState {
        return internalFormElementReducer<EmailFieldState>(state, event);
    };
}
