import { Message } from "packages/entity/common-types";

export enum FormElementTypes {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = "password",
    CHECKBOX = "checkbox",
}

type GenericFormElementState<T extends FormElementTypes = any, Data = {}> = Data & {
    id: string
    type: T
    isRequired: boolean
    isDisabled: boolean
}

type TextFieldData = {
    value: string
    messages: Message[]
}

type CheckboxData = {
    value: boolean
    messages: Message[]
}

export type TextFieldState = GenericFormElementState<FormElementTypes.TEXT, TextFieldData>
export type EmailFieldState = GenericFormElementState<FormElementTypes.EMAIL, TextFieldData>
export type PasswordFieldState = GenericFormElementState<FormElementTypes.PASSWORD, TextFieldData>
export type CheckboxState = GenericFormElementState<FormElementTypes.CHECKBOX, CheckboxData>
export type FormElementState = (TextFieldState | EmailFieldState | PasswordFieldState | CheckboxState)

export type FormElementStateChanges = { formElement: FormElementState, stateChanges: Partial<FormElementState> }
