import uuidV4 from 'uuid/v4';
import { FormElementTypes, PasswordFieldState } from "Common/Domain/FormElement/Types";
import { formElementReducer } from "Common/Domain/FormElement/Reducer/FormElementReducer";
import { FormElementStateWasChanged } from "Common/Domain/FormElement/Event/FormElementStateWasChanged";
import { Reducer } from "redux";

type Event = FormElementStateWasChanged;

const initialPasswordFieldState: PasswordFieldState = {
    id: uuidV4(),
    type: FormElementTypes.PASSWORD,
    readOnly: false,
    value: '',
};

export function createPasswordFieldReducer(partialInitialState: Partial<PasswordFieldState> = {}): Reducer<PasswordFieldState> {
    const initialState: PasswordFieldState = {
        ...initialPasswordFieldState,
        ...partialInitialState,
    };
    return function (state: PasswordFieldState = initialState, event: Event): PasswordFieldState {
        return formElementReducer(state, event);
    };
}
