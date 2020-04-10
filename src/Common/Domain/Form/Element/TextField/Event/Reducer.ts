import uuidV4 from "uuid/v4";
import {TextFieldEvent, TextFieldEventTypes, TextFieldState, Types} from "Common/Domain/Form/Element/TextField/Types";
import {FormElementReducer} from "Common/Domain/Form/Element/Types";

export function createTextFieldState(partialInitialState: Partial<TextFieldState> = {}) {
    const state: TextFieldState = {
        id: uuidV4(),
        type: Types.TEXT,
        value: '',
        readOnly: false,
        messages: [],
    };
    return {
        ...state,
        initialStatePart: partialInitialState
    };
}

export function createTextFieldReducer(initialState: TextFieldState): FormElementReducer<TextFieldState> {
    return function(state: TextFieldState = initialState, event?: TextFieldEvent): TextFieldState {
        if (!event) {
            return state;
        }
        if(event.type === TextFieldEventTypes.TEXT_FIELD_STATE_WAS_CHANGED && event.payload.id === state.id) {
            return {
                ...state,
                ...event.payload.stateChanges,
            };
        }
        return state;
    };
}