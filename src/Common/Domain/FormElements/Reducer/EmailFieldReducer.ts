import { EmailFieldState, FormElementEvents} from "Common/Domain/FormElements/Types";
import { formElementReducer } from "Common/Domain/FormElements/Reducer/FormElementReducer";
import { Reducer } from "redux";
import { createEmailFieldState } from "Common/Domain/FormElements/FormElementStateFactory";

type PartialInitialState = Partial<Omit<EmailFieldState, "type">>;

export function createEmailFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<EmailFieldState> {
    const initialState: EmailFieldState = createEmailFieldState(partialInitialState);
    return function (state: EmailFieldState = initialState, event: FormElementEvents): EmailFieldState {
        return formElementReducer<EmailFieldState>(state, event);
    };
}
