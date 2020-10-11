import uuidV4 from "uuid/v4";
import {
    CheckboxState,
    EmailFieldState,
    FormElementTypes,
    IsFormElementTypeConfirmationProp,
    PasswordFieldState,
    TextFieldState,
} from "./types";

type TextFieldCreationSettings = Partial<Omit<TextFieldState, "isFormElement3025a126" | "type">>
export function createTextFieldState(partialInitialState: TextFieldCreationSettings = {}): TextFieldState {
    return {
        [IsFormElementTypeConfirmationProp]: true,
        type: FormElementTypes.TEXT,
        id: uuidV4(),
        isDisabled: false,
        isRequired: false,
        value: '',
        messages: [],
        ...partialInitialState,
    };
}

type PasswordFieldStateCreationSettings = Partial<Omit<PasswordFieldState, "isFormElement3025a126" | "type">>;
export function createPasswordFieldState(partialInitialState: PasswordFieldStateCreationSettings = {}): PasswordFieldState {
    return {
        [IsFormElementTypeConfirmationProp]: true,
        type: FormElementTypes.PASSWORD,
        id: uuidV4(),
        isDisabled: false,
        isRequired: false,
        value: '',
        messages: [],
        ...partialInitialState,
    };
}

type EmailFieldStateCreationSettings = Partial<Omit<EmailFieldState, "isFormElement3025a126" | "type">>;
export function createEmailFieldState(partialInitialState: EmailFieldStateCreationSettings = {}): EmailFieldState {
    return {
        [IsFormElementTypeConfirmationProp]: true,
        type: FormElementTypes.EMAIL,
        id: uuidV4(),
        isDisabled: false,
        isRequired: false,
        value: '',
        messages: [],
        ...partialInitialState,
    };
}

type CheckboxStateCreationSettings = Partial<Omit<CheckboxState, "isFormElement3025a126" | "type">>;
export function createCheckboxState(partialInitialState: CheckboxStateCreationSettings = {}): CheckboxState {
    return {
        [IsFormElementTypeConfirmationProp]: true,
        type: FormElementTypes.CHECKBOX,
        id: uuidV4(),
        isDisabled: false,
        isRequired: false,
        value: false,
        messages: [],
        ...partialInitialState,
    };
}
