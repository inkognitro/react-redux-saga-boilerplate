import { FieldMessagePath, Message } from 'packages/common/types/util/domain';

export const IsFormElementTypeConfirmationProp = 'isFormElement3025a126';

export type FieldMessagePathPart = FieldMessagePath | string;

export enum FormElementTypes {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = 'password',
    CHECKBOX = 'checkbox',
}

export type GenericFormElementState<T extends FormElementTypes = any, Data = {}> = Data & {
    [IsFormElementTypeConfirmationProp]: true;
    id: string;
    type: T;
    isRequired: boolean;
    isDisabled: boolean;
    fieldMessagePathPart?: FieldMessagePathPart;
};

type TextFieldData = {
    value: string;
    messages: Message[];
};

type CheckboxData = {
    value: boolean;
    messages: Message[];
};

export type TextFieldState = GenericFormElementState<FormElementTypes.TEXT, TextFieldData>;
export type EmailFieldState = GenericFormElementState<FormElementTypes.EMAIL, TextFieldData>;
export type PasswordFieldState = GenericFormElementState<FormElementTypes.PASSWORD, TextFieldData>;
export type CheckboxState = GenericFormElementState<FormElementTypes.CHECKBOX, CheckboxData>;
export type FormElementState = TextFieldState | EmailFieldState | PasswordFieldState | CheckboxState;

export type FormElementStateChanges = {
    formElement: FormElementState;
    stateChanges: Partial<FormElementState>;
};
