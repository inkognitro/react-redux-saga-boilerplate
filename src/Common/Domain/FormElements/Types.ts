import {FormElementStateWasChanged} from "Common/Domain/FormElements/Event/FormElementStateWasChanged";
import {FormElementStatesWereChanged} from "Common/Domain/FormElements/Event/FormElementStatesWereChanged";

export enum FormElementCommandTypes {
    CHANGE_FORM_ELEMENT_STATE = 'CHANGE_FORM_ELEMENT_STATE-1d8df24a-9de9-49c5-bcdc-659b5d4267e7',
    CHANGE_FORM_ELEMENT_STATES = 'CHANGE_FORM_ELEMENT_STATES-1d8df24a-9de9-49c5-bcdc-659b5d4267e7',
}

export enum FormElementEventTypes {
    FORM_ELEMENT_STATE_WAS_CHANGED = 'FORM_ELEMENT_STATE_WAS_CHANGED-beeac545-1968-4751-bb8d-4518e5536e66',
    FORM_ELEMENT_STATES_WERE_CHANGED = 'FORM_ELEMENT_STATES_WERE_CHANGED-beeac545-1968-4751-bb8d-4518e5536e66',
}

export enum FormElementTypes {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = "password",
}

type BasicFormElementState<AdditionalElementState = any> = (AdditionalElementState & {
    id: string
    type: FormElementTypes
    readOnly: boolean
});

type InputFieldTypeState<FormElementType> = BasicFormElementState<{
    type: FormElementType
    value: string
}>;

export type TextFieldState = InputFieldTypeState<FormElementTypes.TEXT>;
export type EmailFieldState = InputFieldTypeState<FormElementTypes.EMAIL>;
export type PasswordFieldState = InputFieldTypeState<FormElementTypes.PASSWORD>;

export type FormElementState = (TextFieldState | EmailFieldState | PasswordFieldState);

export type MultipleFormElementStateChanges = { formElementId: string, stateChanges: Partial<FormElementState> }[];
export type FormElementEvents = (FormElementStateWasChanged | FormElementStatesWereChanged);