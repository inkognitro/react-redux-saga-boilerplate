import { EmailFieldState, FormElementEvent } from "Packages/Common/FormElement/Domain/Types";
import { internalFormElementReducer } from "Packages/Common/FormElement/Domain/Reducer/InternalFormElementReducer";
import { Reducer } from "redux";
import { createEmailFieldState } from "Packages/Common/FormElement/Domain/FormElementStateFactory";

type PartialInitialState = Partial<Omit<EmailFieldState, "type">>;

export const emailFieldReducer = createEmailFieldReducer();

export function createEmailFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<EmailFieldState> {
    const initialState: EmailFieldState = createEmailFieldState(partialInitialState);
    return function (state: EmailFieldState = initialState, event: FormElementEvent): EmailFieldState {
        return internalFormElementReducer<EmailFieldState>(state, event);
    };
}
