import uuidV4 from "uuid/v4";
import {
    CheckboxState,
    EmailFieldState,
    FormElementTypes,
    PasswordFieldState,
    TextFieldState,
} from "./types";

export function createTextFieldState(partialInitialState: Partial<TextFieldState> = {}): TextFieldState {
    return {
        type: FormElementTypes.TEXT,
        id: uuidV4(),
        isDisabled: false,
        isRequired: false,
        value: '',
        messages: [],
        ...partialInitialState,
    };
}

type PasswordFieldStateCreationSettings = Partial<Omit<PasswordFieldState, "type">>;
export function createPasswordFieldState(partialInitialState: PasswordFieldStateCreationSettings = {}): PasswordFieldState {
    return {
        type: FormElementTypes.PASSWORD,
        id: uuidV4(),
        isDisabled: false,
        isRequired: false,
        value: '',
        messages: [],
        ...partialInitialState,
    };
}

type EmailFieldStateCreationSettings = Partial<Omit<EmailFieldState, "type">>;
export function createEmailFieldState(partialInitialState: EmailFieldStateCreationSettings = {}): EmailFieldState {
    return {
        type: FormElementTypes.EMAIL,
        id: uuidV4(),
        isDisabled: false,
        isRequired: false,
        value: '',
        messages: [],
        ...partialInitialState,
    };
}

type CheckboxStateCreationSettings = Partial<CheckboxState>;
export function createCheckboxState(partialInitialState: CheckboxStateCreationSettings = {}): CheckboxState {
    return {
        type: FormElementTypes.CHECKBOX,
        id: uuidV4(),
        isDisabled: false,
        isRequired: false,
        value: false,
        messages: [],
        ...partialInitialState,
    };
}
