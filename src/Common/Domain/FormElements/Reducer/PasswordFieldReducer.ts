import { FormElementEvent, PasswordFieldState } from "Common/Domain/FormElements/Types";
import { internalFormElementReducer } from "Common/Domain/FormElements/Reducer/InternalFormElementReducer";
import { Reducer } from "redux";
import { createPasswordFieldState } from "Common/Domain/FormElements/FormElementStateFactory";

type PartialInitialState = Partial<Omit<PasswordFieldState, "type">>;

export const passwordFieldReducer = createPasswordFieldReducer();

export function createPasswordFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<PasswordFieldState> {
    const initialState: PasswordFieldState = createPasswordFieldState(partialInitialState);
    return function (state: PasswordFieldState = initialState, event: FormElementEvent): PasswordFieldState {
        return internalFormElementReducer<PasswordFieldState>(state, event);
    };
}
