import { EmailFieldState, FormElementEvent } from "Common/Domain/FormUtils/FormElements/Types";
import { internalFormElementReducer } from "Common/Domain/FormUtils/FormElements/Reducer/InternalFormElementReducer";
import { Reducer } from "redux";
import { createEmailFieldState } from "Common/Domain/FormUtils/FormElements/FormElementStateFactory";

type PartialInitialState = Partial<Omit<EmailFieldState, "type">>;

export const emailFieldReducer = createEmailFieldReducer();

export function createEmailFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<EmailFieldState> {
    const initialState: EmailFieldState = createEmailFieldState(partialInitialState);
    return function (state: EmailFieldState = initialState, event: FormElementEvent): EmailFieldState {
        return internalFormElementReducer<EmailFieldState>(state, event);
    };
}
