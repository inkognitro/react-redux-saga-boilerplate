import {
    BasicFormElementState as BasicFormElementStateType,
    PasswordFieldState as PasswordFieldStateType,
    TextFieldState as TextFieldStateType,
    EmailFieldState as EmailFieldStateType,
    CheckboxState as CheckboxStateType,
    FormElementState as FormElementStateType,
    FormElementStateChanges as FormElementStateChangesType,
    InputFieldState as InputFieldStateType,
    FormElementTypes,
} from './types';
import {
    ChangeFormElementState as ChangeFormElementStateType,
    ChangeFormElementStates as ChangeFormElementStatesType,
} from "./command";
import {
    FormElementStatesWereChanged as FormElementStatesWereChangedType,
    FormElementStateWasChanged as FormElementStateWasChangedType,
} from "./event";

export type PasswordFieldState = PasswordFieldStateType;
export type TextFieldState = TextFieldStateType;
export type EmailFieldState = EmailFieldStateType;
export type CheckboxState = CheckboxStateType;
export type BasicFormElementState<Type extends FormElementTypes = any> = BasicFormElementStateType<Type>;
export type FormElementState = FormElementStateType;
export type FormElementStateChanges = FormElementStateChangesType;
export type ChangeFormElementState = ChangeFormElementStateType;
export type ChangeFormElementStates = ChangeFormElementStatesType;
export type FormElementStatesWereChanged = FormElementStatesWereChangedType;
export type FormElementStateWasChanged = FormElementStateWasChangedType;
export type InputFieldState<FormElementType extends FormElementTypes = any> = InputFieldStateType<FormElementType>;
export type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged)

export { FormElementTypes } from './types';
export { createFormElementsFlow } from './saga/flow';
export { createEmailFieldReducer, emailFieldReducer } from './reducer/email.field.reducer';
export { createPasswordFieldReducer, passwordFieldReducer } from './reducer/password.field.reducer';
export { createTextFieldReducer, textFieldReducer } from './reducer/text.field.reducer';
export { formElementReducer } from './reducer/form.element.reducer';
export {
    createPasswordFieldState,
    createTextFieldState,
    createEmailFieldState,
    createCheckboxState,
} from './form.element.state.factory';
export { createChangeFormElementState, createChangeFormElementStates } from "./command";
export { FormElementEventTypes } from "./event";
