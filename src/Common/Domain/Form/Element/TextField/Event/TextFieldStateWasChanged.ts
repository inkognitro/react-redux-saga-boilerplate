import {Event} from "Common/Domain/Bus/Event";
import {TextFieldEventTypes, TextFieldState} from "Common/Domain/Form/Element/TextField/Types";

export function createTextFieldStateWasChanged(id: string, stateChanges: Partial<TextFieldState>): TextFieldStateWasChanged {
    return {
        type: TextFieldEventTypes.TEXT_FIELD_STATE_WAS_CHANGED,
        payload: {id, stateChanges}
    };
}

export type TextFieldStateWasChanged = Event<TextFieldEventTypes.TEXT_FIELD_STATE_WAS_CHANGED, {
    id: string,
    stateChanges: Partial<TextFieldState>
}>;