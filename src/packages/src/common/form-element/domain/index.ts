import {
    TextFieldState as TextFieldStateType,
    PasswordFieldState as PasswordFieldStateType,
    EmailFieldState as EmailFieldStateType,
    CheckboxState as CheckboxStateType,
    FormElementState as FormElementStateType,
} from './types';

export type TextFieldState = TextFieldStateType;
export type PasswordFieldState = PasswordFieldStateType;
export type EmailFieldState = EmailFieldStateType;
export type CheckboxState = CheckboxStateType;
export type FormElementState = FormElementStateType;

export { FormElementTypes } from './types';
export { createFormElementReducer } from './reducer';
export { createFormElementStateWasChanged } from './event';
export {
    createPasswordFieldState,
    createTextFieldState,
    createEmailFieldState,
    createCheckboxState,
} from './state.factory';
