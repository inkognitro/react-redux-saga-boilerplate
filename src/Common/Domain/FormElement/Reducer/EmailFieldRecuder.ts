import uuidV4 from 'uuid/v4';
import { EmailFieldState, FormElementTypes } from "Common/Domain/FormElement/Types";
import { formElementReducer } from "Common/Domain/FormElement/Reducer/FormElementReducer";
import { FormElementStateWasChanged } from "Common/Domain/FormElement/Event/FormElementStateWasChanged";
import { Reducer } from "redux";

type Event = FormElementStateWasChanged;

const initialEmailFieldState: EmailFieldState = {
    id: uuidV4(),
    type: FormElementTypes.EMAIL,
    readOnly: false,
    value: '',
};

export function createEmailFieldReducer(partialInitialState: Partial<EmailFieldState> = {}): Reducer<EmailFieldState> {
    const initialState: EmailFieldState = {
        ...initialEmailFieldState,
        ...partialInitialState,
    };
    return function (state: EmailFieldState = initialState, event: Event): EmailFieldState {
        return formElementReducer(state, event);
    };
}
