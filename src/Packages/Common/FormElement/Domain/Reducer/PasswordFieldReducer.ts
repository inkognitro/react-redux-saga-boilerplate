import { FormElementEvent, PasswordFieldState } from "Packages/Common/FormElement/Domain/Types";
import { internalFormElementReducer } from "Packages/Common/FormElement/Domain/Reducer/InternalFormElementReducer";
import { Reducer } from "redux";
import { createPasswordFieldState } from "Packages/Common/FormElement/Domain/FormElementStateFactory";

type PartialInitialState = Partial<Omit<PasswordFieldState, "type">>;

export const passwordFieldReducer = createPasswordFieldReducer();

export function createPasswordFieldReducer(partialInitialState: PartialInitialState = {}): Reducer<PasswordFieldState> {
    const initialState: PasswordFieldState = createPasswordFieldState(partialInitialState);
    return function (state: PasswordFieldState = initialState, event: FormElementEvent): PasswordFieldState {
        return internalFormElementReducer<PasswordFieldState>(state, event);
    };
}
