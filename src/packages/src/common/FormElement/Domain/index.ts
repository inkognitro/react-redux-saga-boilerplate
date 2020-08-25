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
} from './Types';
import { ChangeFormElementState as ChangeFormElementStateType } from './Command/ChangeFormElementState';
import { ChangeFormElementStates as ChangeFormElementStatesType } from './Command/ChangeFormElementStates';
import { FormElementStatesWereChanged as FormElementStatesWereChangedType } from './Event/FormElementStatesWereChanged';
import { FormElementStateWasChanged as FormElementStateWasChangedType } from './Event/FormElementStateWasChanged';

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

export { FormElementTypes } from './Types';
export { createFormElementsFlow } from './Saga/Flow';
export { createChangeFormElementState } from './Command/ChangeFormElementState';
export { createChangeFormElementStates } from './Command/ChangeFormElementStates';
export { createEmailFieldReducer, emailFieldReducer } from './Reducer/EmailFieldReducer';
export { createPasswordFieldReducer, passwordFieldReducer } from './Reducer/PasswordFieldReducer';
export { createTextFieldReducer, textFieldReducer } from './Reducer/TextFieldReducer';
export { formElementReducer } from './Reducer/FormElementReducer';
export {
    createPasswordFieldState,
    createTextFieldState,
    createEmailFieldState,
    createCheckboxState,
} from './FormElementStateFactory';
export { FormElementEventTypes } from "./Event/Types";
