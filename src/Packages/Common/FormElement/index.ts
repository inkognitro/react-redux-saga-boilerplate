import {
    PasswordFieldState as PasswordFieldStateType,
    TextFieldState as TextFieldStateType,
    EmailFieldState as EmailFieldStateType,
    CheckboxState as CheckboxStateType,
    FormElementState as FormElementStateType,
    FormElementStateChanges as FormElementStateChangesType,
    FormElementEvent as FormElementEventType,
    InputFieldState as InputFieldStateType,
    FormElementTypes,
} from './Domain/Types';
import { ChangeFormElementState as ChangeFormElementStateType } from './Domain/Command/ChangeFormElementState';
import { ChangeFormElementStates as ChangeFormElementStatesType } from './Domain/Command/ChangeFormElementStates';
import { FormElementStatesWereChanged as FormElementStatesWereChangedType } from './Domain/Event/FormElementStatesWereChanged';
import { FormElementStateWasChanged as FormElementStateWasChangedType } from './Domain/Event/FormElementStateWasChanged';

export type PasswordFieldState = PasswordFieldStateType;
export type TextFieldState = TextFieldStateType;
export type EmailFieldState = EmailFieldStateType;
export type CheckboxState = CheckboxStateType;
export type FormElementState = FormElementStateType;
export type FormElementStateChanges = FormElementStateChangesType;
export type ChangeFormElementState = ChangeFormElementStateType;
export type ChangeFormElementStates = ChangeFormElementStatesType;
export type FormElementStatesWereChanged = FormElementStatesWereChangedType;
export type FormElementStateWasChanged = FormElementStateWasChangedType;
export type FormElementEvent = FormElementEventType;
export type InputFieldState<FormElementType extends FormElementTypes = any> = InputFieldStateType<FormElementType>;

export { FormElementTypes, FormElementEventTypes } from './Domain/Types';
export { createFormElementsFlow } from './Domain/Saga/Flow';
export { createChangeFormElementState } from './Domain/Command/ChangeFormElementState';
export { createChangeFormElementStates } from './Domain/Command/ChangeFormElementStates';
export { createEmailFieldReducer, emailFieldReducer } from './Domain/Reducer/EmailFieldReducer';
export { createPasswordFieldReducer, passwordFieldReducer } from './Domain/Reducer/PasswordFieldReducer';
export { createTextFieldReducer, textFieldReducer } from './Domain/Reducer/TextFieldReducer';
export { formElementReducer } from './Domain/Reducer/FormElementReducer';
export {
    createPasswordFieldState,
    createTextFieldState,
    createEmailFieldState,
} from './Domain/FormElementStateFactory';
export { EmailFieldWC } from './UI/EmailFieldWC';
export { FormElementGroupWC } from './UI/FormElementGroupWC';
export { LabelWC } from './UI/LabelWC';
export { MessagesWC } from './UI/MessagesWC';
export { PasswordFieldWC } from './UI/PasswordFieldWC';
export { PrimaryButtonWC } from './UI/PrimaryButtonWC';
export { SecondaryButtonWC } from './UI/SecondaryButtonWC';
export { TextFieldWC } from './UI/TextFieldWC';
export { CheckboxWC } from './UI/CheckboxWC';
