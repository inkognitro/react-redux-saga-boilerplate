import {
    EmailFieldState,
    FormElementState,
    FormElementTypes,
    PasswordFieldState,
    TextFieldState
} from "Common/Domain/FormElement/Types";
import uuidV4 from "uuid/v4";

function createBaseFormElementState(): Omit<Partial<FormElementState>, "type"> {
    return {
        id: uuidV4(),
        readOnly: false,
    };
}

type TextFieldStateCreationSettings = Omit<Partial<TextFieldState>, "type">;
export function createTextFieldState(partialInitialState: TextFieldStateCreationSettings = {}): TextFieldState {
    return {
        ...createBaseFormElementState(),
        ...partialInitialState,
        type: FormElementTypes.TEXT,
    };
}

type PasswordFieldStateCreationSettings = Omit<Partial<PasswordFieldState>, "type">;
export function createPasswordFieldState(partialInitialState: PasswordFieldStateCreationSettings = {}): PasswordFieldState {
    return {
        ...createBaseFormElementState(),
        ...partialInitialState,
        type: FormElementTypes.PASSWORD,
    };
}

type EmailFieldStateCreationSettings = Omit<Partial<EmailFieldState>, "type">;
export function createEmailFieldState(partialInitialState: EmailFieldStateCreationSettings = {}): EmailFieldState {
    return {
        ...createBaseFormElementState(),
        ...partialInitialState,
        type: FormElementTypes.EMAIL,
    };
}
