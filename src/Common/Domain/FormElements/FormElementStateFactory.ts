import {
    EmailFieldState,
    FormElementTypes,
    PasswordFieldState,
    TextFieldState,
} from "Common/Domain/FormElements/Types";
import uuidV4 from "uuid/v4";

export function createTextFieldState(partialInitialState: Partial<TextFieldState> = {}): TextFieldState {
    return {
        id: (partialInitialState.id ? partialInitialState.id : uuidV4()),
        value: (partialInitialState.value ? partialInitialState.value : ''),
        readOnly: (partialInitialState.readOnly ? partialInitialState.readOnly : false),
        type: FormElementTypes.TEXT,
    };
}

type PasswordFieldStateCreationSettings = Partial<Omit<PasswordFieldState, "type">>;
export function createPasswordFieldState(partialInitialState: PasswordFieldStateCreationSettings = {}): PasswordFieldState {
    return {
        id: (partialInitialState.id ? partialInitialState.id : uuidV4()),
        value: (partialInitialState.value ? partialInitialState.value : ''),
        readOnly: (partialInitialState.readOnly ? partialInitialState.readOnly : false),
        type: FormElementTypes.PASSWORD,
    };
}

type EmailFieldStateCreationSettings = Partial<Omit<EmailFieldState, "type">>;
export function createEmailFieldState(partialInitialState: EmailFieldStateCreationSettings = {}): EmailFieldState {
    return {
        id: (partialInitialState.id ? partialInitialState.id : uuidV4()),
        value: (partialInitialState.value ? partialInitialState.value : ''),
        readOnly: (partialInitialState.readOnly ? partialInitialState.readOnly : false),
        type: FormElementTypes.EMAIL,
    };
}
