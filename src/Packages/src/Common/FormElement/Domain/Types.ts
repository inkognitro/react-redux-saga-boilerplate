import { Message } from "Packages/Entity/CommonTypes";

export enum FormElementTypes {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = "password",
    CHECKBOX = "checkbox",
}

export interface BasicFormElementState<Type extends FormElementTypes> {
    id: string
    type: Type
    readOnly: boolean
}

export type InputFieldState<FormElementType extends FormElementTypes = any> = (BasicFormElementState<FormElementType> & {
    value: string,
    messages: Message[]
});

export type TextFieldState = InputFieldState<FormElementTypes.TEXT>
export type EmailFieldState = InputFieldState<FormElementTypes.EMAIL>
export type PasswordFieldState = InputFieldState<FormElementTypes.PASSWORD>
export type CheckboxState = (BasicFormElementState<FormElementTypes.CHECKBOX> & {
    value: boolean
    messages: Message[]
})

export type FormElementState = (TextFieldState | EmailFieldState | PasswordFieldState | CheckboxState)

export type FormElementStateChanges = { formElement: FormElementState, stateChanges: Partial<FormElementState> }
