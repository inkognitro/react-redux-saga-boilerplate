import { FormElementEvents, PasswordFieldState} from "Common/Domain/FormElements/Types";
import { formElementReducer } from "Common/Domain/FormElements/Reducer/FormElementReducer";
import { Reducer } from "redux";
import { createPasswordFieldState } from "Common/Domain/FormElements/FormElementStateFactory";

type PartialInitialState = Partial<Omit<PasswordFieldState, "type">>;

export function createPasswordFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<PasswordFieldState> {
    const initialState: PasswordFieldState = createPasswordFieldState(partialInitialState);
    return function (state: PasswordFieldState = initialState, event: FormElementEvents): PasswordFieldState {
        return formElementReducer<PasswordFieldState>(state, event);
    };
}
