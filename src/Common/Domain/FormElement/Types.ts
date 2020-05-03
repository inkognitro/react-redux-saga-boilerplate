export enum FormElementCommandTypes {
    CHANGE_FORM_ELEMENT_STATE = 'CHANGE_FORM_ELEMENT_STATE-1d8df24a-9de9-49c5-bcdc-659b5d4267e7'
}

export enum FormElementEventTypes {
    FORM_ELEMENT_STATE_WAS_CHANGED = 'FORM_ELEMENT_STATE_WAS_CHANGED-1d8df24a-9de9-49c5-bcdc-659b5d4267e7'
}

export enum FormElementTypes {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = "password",
}

export type FormElementState<AdditionalElementState = any> = (AdditionalElementState & {
    id: string
    type: FormElementTypes
    readOnly: boolean
});

type InputFieldTypeState<FormElementType> = FormElementState<{
    type: FormElementType
    value: string
}>;

export type TextFieldState = InputFieldTypeState<FormElementTypes.TEXT>;
export type EmailFieldState = InputFieldTypeState<FormElementTypes.EMAIL>;
export type PasswordFieldState = InputFieldTypeState<FormElementTypes.PASSWORD>;
