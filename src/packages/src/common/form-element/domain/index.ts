import {
    GenericFormElementState as GenericFormElementStateType,
    TextFieldState as TextFieldStateType,
    PasswordFieldState as PasswordFieldStateType,
    EmailFieldState as EmailFieldStateType,
    CheckboxState as CheckboxStateType,
    FormElementState as FormElementStateType,
    FormElementTypes,
} from './types';

export type GenericFormElementState<T extends FormElementTypes = any, D = {}> = GenericFormElementStateType<T, D>;
export type TextFieldState = TextFieldStateType;
export type PasswordFieldState = PasswordFieldStateType;
export type EmailFieldState = EmailFieldStateType;
export type CheckboxState = CheckboxStateType;
export type FormElementState = FormElementStateType;

export { FormElementTypes, IsFormElementTypeConfirmationProp } from './types';
export { createFormElementReducer, formElementReducer } from './reducer';
export { createFormElementStateWasChanged } from './event';
export { setFormElementMessages } from './saga/effect';
export {
    createPasswordFieldState,
    createTextFieldState,
    createEmailFieldState,
    createCheckboxState,
} from './state.factory';
