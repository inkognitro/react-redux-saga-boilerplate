import uuidV4 from 'uuid/v4';
import { FormElementTypes, TextFieldState } from "Common/Domain/FormElement/Types";
import { formElementReducer } from "Common/Domain/FormElement/Reducer/FormElementReducer";
import { FormElementStateWasChanged } from "Common/Domain/FormElement/Event/FormElementStateWasChanged";
import { Reducer } from "redux";

type Event = FormElementStateWasChanged;

const initialTextFieldState: TextFieldState = {
    id: uuidV4(),
    type: FormElementTypes.TEXT,
    readOnly: false,
    value: '',
};

export function createTextFieldReducer(partialInitialState: Partial<TextFieldState> = {}): Reducer<TextFieldState> {
    const initialState: TextFieldState = {
        ...initialTextFieldState,
        ...partialInitialState,
    };
    return function (state: TextFieldState = initialState, event: Event): TextFieldState {
        return formElementReducer(state, event);
    };
}
